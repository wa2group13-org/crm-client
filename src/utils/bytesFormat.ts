export function bytesToBytes(size: number) {
  const unit = ["B", "KB", "MB", "GB", "TB", "PB"][
    Math.floor(Math.log2(size) / 10)
  ];

  const value = size / Math.pow(1024, Math.floor(Math.log2(size) / 10));

  return `${value.toFixed(0)} ${unit}`;
}
