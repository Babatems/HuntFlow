// This file imports and configures Google Fonts (Inter and Lusitana) for use in the HuntFlow app's typography.

import { Inter, Lusitana } from 'next/font/google';

export const inter = Inter({ subsets: ['latin'] });

export const lusitana = Lusitana({ subsets: ['latin'], weight: ['400', '700'] });