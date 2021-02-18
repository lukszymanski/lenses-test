import { act, renderHook } from '@testing-library/react-hooks';

import { useWebsocket } from "./websocket.hook";
import { WebSocket, Server } from 'mock-socket';

global.WebSocket = WebSocket;

describe("useWebsocket", () => {
  const url = 'ws://local:1234/';
  let ws: Server;

  beforeAll(() => {
    ws = new Server(url);
  });

  it("should be defined", () => {
    expect(useWebsocket).toBeDefined();
  });

  it('should init on event push', () => {
    const { result } = renderHook(() => useWebsocket({ url }))
    const event = {
      token: '1',
      sql: 'test custom query'
    };

    act(() => {
      result.current.query(event);
    });

    expect(result.current.messages).toEqual([]);
    expect(result.current.count).toEqual(0);
  });
});
