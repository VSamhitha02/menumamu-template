import * as migration_20251222_072618 from './20251222_072618';
import * as migration_20260928_105053 from './20260928_105053';

export const migrations = [
  {
    up: migration_20251222_072618.up,
    down: migration_20251222_072618.down,
    name: '20251222_072618',
  },
  {
    up: migration_20260928_105053.up,
    down: migration_20260928_105053.down,
    name: '20260928_105053'
  },
];
