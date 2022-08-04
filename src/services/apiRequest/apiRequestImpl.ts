import http from 'http';
import https from 'https';

import { ApiRequest } from './apiRequest';

export class ApiRequestImpl implements ApiRequest {
  public get<T extends Record<string, any>>(urlStr: string, qc?: Record<string, string>): Promise<T> {
    const url = this._mapUrlToObj(urlStr, qc);
    const httpModule = url.isHTPPS ? https : http;

    return new Promise((resolve, reject) => {
      const req = httpModule.request(
        {
          hostname: url.hostname,
          path: url.path,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
        (res) => {
          let str = '';

          res.on('error', reject);

          res.on('data', (chunk: Buffer) => {
            str += chunk.toString();
          });

          res.on('end', () => {
            try {
              const data = JSON.parse(str);
              return resolve(data);
            } catch (err) {
              return reject(err);
            }
          });
        }
      );

      req.on('error', reject);

      req.end();
    });
  }

  public post<T extends Record<string, any>>(urlStr: string, body: any): Promise<T> {
    const url = this._mapUrlToObj(urlStr);
    const httpModule = url.isHTPPS ? https : http;

    return new Promise((resolve, reject) => {
      const req = httpModule.request(
        {
          hostname: url.hostname,
          path: url.path,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
        (res) => {
          let str = '';

          res.on('error', reject);

          res.on('data', (chunk: Buffer) => {
            str += chunk.toString();
          });

          res.on('end', () => {
            try {
              const data = JSON.parse(str);
              return resolve(data);
            } catch (err) {
              return reject(err);
            }
          });
        }
      );

      req.on('error', reject);

      req.write(JSON.stringify(body));

      req.end();
    });
  }

  public delete(urlStr: string): Promise<void> {
    const url = this._mapUrlToObj(urlStr);
    const httpModule = url.isHTPPS ? https : http;

    return new Promise((resolve, reject) => {
      const req = httpModule.request({ hostname: url.hostname, path: url.path, method: 'DELETE' }, (res) => {
        res.on('error', reject);

        res.on('end', resolve);
      });

      req.on('error', reject);

      req.end();
    });
  }

  private _mapUrlToObj(urlStr: string, qc?: Record<string, string>) {
    const url = new URL(urlStr);

    if (qc) {
      Object.keys(qc).forEach((key) => {
        url.searchParams.append(key, qc[key]);
      });
    }

    return {
      hostname: url.hostname,
      path: url.pathname + url.search,
      isHTPPS: url.protocol === 'https:',
    };
  }
}
