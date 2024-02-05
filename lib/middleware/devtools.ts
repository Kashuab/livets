import {ActionData, Middleware} from "../Orchestrator";
import fs from 'fs';
import { resolve } from 'path'
import mime from 'mime-types';
import express from 'express';
import cors from 'cors';

export type DevtoolsStats = {
  rooms: {
    name: string;
    actionNames: string[];
  }[];

  activeRooms: Record<string, Record<string, {
    timeline: { action: ActionData; stateBefore: object; stateAfter: object; }[];
  }>>
}

let stats: DevtoolsStats = {
  rooms: [],
  activeRooms: {}
}

export const devtools: Middleware = {
  serverCreated: stuff => {
    stats.rooms = Object.entries(stuff.rooms).map(([name, room]) => ({
      name,
      actionNames: Object.keys(room.store({}).actions)
    }));

    const app = express();

    app.use(cors());
    app.use(express.json());

    app.post('/devtools/action', async (req, res) => {
      console.log('sim action', req.body)


      await stuff.orchestrator.handleRoomAction(req.body);

      console.log('erm 4', req.url)

      res.json({ ok: true });
    });

    app.get('/devtools/stats', (req, res) => {
      if (res.headersSent) return;

      res.setHeader('Content-Type', 'application/json')
      res.json(stats);
    });

    app.get('/devtools*', (req, res) => {
      if (res.headersSent) return;

      console.log('erm', req.url)

      const filePath = req.url.replace('/devtools', '') || 'index.html';
      const file = fs.readFileSync(resolve(__dirname, `../../devtools/dist/${filePath}`), 'utf-8');
      const type = mime.lookup(filePath);

      res.setHeader('Content-Type', type || 'application/octet-stream');
      res.send(file);
    });

    stuff.http.on('request', (req, res) => {
      if (req.url?.includes('socket.io')) return;
      return app(req, res);
    });
  },
  beforeAction: data => {
    console.log('beforeAction', data);

    stats.activeRooms[data.action.room.type][data.action.room.id].timeline.push({
      action: data.action,
      stateBefore: cheapDeepClone(data.state),
      stateAfter: cheapDeepClone(data.state),
    });
  },
  afterAction: data => {
    console.log('afterAction', data);
    const timelineEntry = stats.activeRooms[data.action.room.type][data.action.room.id].timeline.find(e => e.action.id === data.action.id)
    if (!timelineEntry) return;

    timelineEntry.stateAfter = cheapDeepClone(data.state);
  },
  roomCreated: data => {
    console.log('roomCreated', data);

    stats.activeRooms[data.name] ||= {};
    stats.activeRooms[data.name][data.id] = {
      timeline: []
    }
  },
  roomJoined: data => {
    console.log('roomJoined', data);
  }
}

function cheapDeepClone(obj: object) {
  return JSON.parse(JSON.stringify(obj));
}