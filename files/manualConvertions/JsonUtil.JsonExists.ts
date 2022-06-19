export const JsonExists = (FileName: string): boolean => {
  if (!FileName) return false
  else if (FileName.indexOf(".json") == -1) FileName += ".json"
  return FileExists("data/skse/plugins/StorageUtilData/" + FileName)
}
