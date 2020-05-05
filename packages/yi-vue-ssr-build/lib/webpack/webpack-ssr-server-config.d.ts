/// <reference types="webpack-dev-server" />
import webpack from 'webpack';
import { BuildConfig } from '../build-config';
export default function getConfig(buildConfig: BuildConfig): webpack.Configuration;
