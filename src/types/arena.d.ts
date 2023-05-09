import { ArenaChannel } from 'arena-ts';

declare module 'arena-ts' {
  interface CustomArenaChannel extends ArenaChannel {
    user: {
      slug: string
    }
  }

}