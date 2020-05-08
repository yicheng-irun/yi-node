#! /usr/bin/env node

import { startBuild } from './index';

startBuild().catch((e) => console.error(e));
