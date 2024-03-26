import fs from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';

export default async function hashNumber(req: NextApiRequest, res: NextApiResponse) {
 if (req.method === 'POST') {
    const { secretNumber } = req.body;
    try {
      const hashedNumber = ethers.solidityPackedKeccak256(["uint256"], [ethers.toBigInt(secretNumber)]);
      res.status(200).json({ hashedNumber: hashedNumber });
    } catch (error) {
        const err = error as Error; 
      res.status(500).json({ error: err.message });
    }
 } else {
    res.status(405).json({ error: 'Method Not Allowed' });
 }
}

