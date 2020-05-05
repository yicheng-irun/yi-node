/// <reference types="webpack-dev-server" />
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { BuildConfig } from '../build-config';
export declare function getSSRConfig(chunks: string, buildConfig: BuildConfig): webpack.Configuration;
export declare function getChildPluginInstances(options: {}, buildConfig: BuildConfig): HtmlWebpackPlugin[];
