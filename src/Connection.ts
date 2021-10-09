import { Socket } from 'net';
import EventEmitter = require('@doinkythederp/events');

export interface ConnectionOptions {
  /** Defaults to `localhost` */
  host?: string;

  /** Defaults to `4711` */
  port?: number;

  /**
   * The time (in millisecods) to wait for a response before giving up.
   * Setting this to a higher number means slower performance, but less chance of erroring.
   *
   * Defaults to 1 second (`1000`).
   */
  responseTimeout?: number;
}

export class MinecraftAPIError extends Error {
  public constructor(
    message?: string,
    data: Record<any, unknown> = {},
    stack?: string
  ) {
    super(message);
    this.name = this.constructor.name;
    if (stack) this.stack = (this.stack?.match(/^.*/)?.[0] ?? '') + stack;
    Object.assign(this, data);
  }
}

/**
 * Represents a failed request due to a missing response
 */
export class NoResponseError extends MinecraftAPIError {
  public readonly request!: string;
}

/**
 * Represents a failed request due to a "Fail" response
 */
export class CommandError extends MinecraftAPIError {
  public readonly request!: string;
  public readonly response!: string;
}

interface ConnectionEvents {
  ready(): void;
  error(err: unknown): void;
}

export class Connection extends EventEmitter<ConnectionEvents> {
  public constructor(protected readonly options: Readonly<ConnectionOptions>) {
    super();
    this.socket = this.createConnection();
  }

  private createConnection() {
    const { host, port } = this.options;
    return new Socket()
      .connect({
        host: host ?? 'localhost',
        port: port ?? 4711
      })
      .once('ready', this.onReady.bind(this))
      .once('error', this.onError.bind(this));
  }

  public reconnect() {
    if (this.destroyed) return;
    this.socket.destroy();
    this.socket = this.createConnection();
  }

  protected isReady = false;

  protected onReady() {
    this.isReady = true;
    this.emit('ready');
  }

  protected onError(err: unknown) {
    this.isReady = false;
    this.socket.destroy();
    this.emit('error', err);
  }

  public send<ExpectResponse extends boolean>(
    data: string,
    expectResponse: ExpectResponse
  ) {
    const stackObj = { stack: '' };
    Error.captureStackTrace(stackObj, this.send);

    return new Promise<string | void>((resolve, reject) => {
      this.queue.push({
        resolve,
        reject,
        expectResponse,
        data,
        stack: stackObj.stack.replace(/^.*/, '')
      });
      if (this.queue.length === 1) this.handleQueue();
    }) as Promise<ExpectResponse extends true ? string : void>;
  }

  private readonly queue: ConnectionQueueMember[] = [];

  private handleQueue() {
    const request = this.queue[0];
    if (!request) return;

    const next = () => {
      setImmediate(() => {
        this.queue.shift();
        this.handleQueue();
      });
    };

    const send = () => {
      this.socket.write(request.data.concat('\n'));

      const listener = (data: Buffer) => {
        let str = data.toString();
        const newline = str.indexOf('\n');

        if (newline === -1) {
          this.line += str;
        } else {
          this.socket.off('data', listener);
          clearTimeout(failTimeout);
          str = this.line.concat(str.slice(0, newline));
          this.line = '';

          if (str === 'Fail') {
            request.reject(
              new CommandError(
                'An error occured while running the command',
                {
                  request: request.data,
                  response: str
                },
                request.stack
              )
            );
            return next();
          }

          request.resolve(request.expectResponse ? str : undefined);
          next();
        }
      };

      this.socket.on('data', listener);
      const failTimeout = setTimeout(() => {
        this.socket.off('data', listener);
        if (request.expectResponse)
          request.reject(
            new NoResponseError(
              'No response was received from the game.',
              {
                request: request.data
              },
              request.stack
            )
          );
        else request.resolve();
        next();
      }, this.options.responseTimeout ?? 1000);
    };

    if (this.isReady) send();
    else this.once('ready', send);
  }

  private line = '';

  public destroy() {
    this.destroyed = true;
    this.socket.destroy();
  }

  protected destroyed = false;

  protected socket: Socket;
}

interface ConnectionQueueMember<ExpectResponse extends boolean = boolean> {
  resolve: (
    response?: ExpectResponse extends true ? string : undefined
  ) => void;
  reject: (err: unknown) => void;

  expectResponse: ExpectResponse;
  data: string;
  stack: string;
}
