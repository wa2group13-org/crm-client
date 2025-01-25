export async function b64ToBlob(b64Data: string, mime: string) {
  return await fetch(`data:${mime};base64,${b64Data}`).then((res) =>
    res.blob(),
  );
}
