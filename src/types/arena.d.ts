import { ArenaChannel, ArenaBlock } from 'arena-ts';

declare module 'arena-ts' {
  interface ArenaChannelMod extends ArenaChannel{
    owner_slug: string,
    user: {slug: string},
    owner: {id: string, username: string},
  } 
}