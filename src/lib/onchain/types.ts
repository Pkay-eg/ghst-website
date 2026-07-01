export interface TokenTransfer {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  from: string;
  to: string;
  value: string;
  tokenDecimal: string;
}

export interface MonthlyMintBar {
  label: string;
  volume: number;
  height: number;
  active: boolean;
}

export interface OnchainStats {
  totalSupply: number;
  decimals: number;
  volume24h: number | null;
  holders: number | null;
  monthlyMintVolume: number | null;
  monthlyMintBars: MonthlyMintBar[] | null;
  mintVolumeLive: boolean;
  mintVolumeSource: string | null;
  indexerSource: string | null;
  updatedAt: number;
  hasIndexer: boolean;
}
