export interface IElectronAPI {
  onUpdateUI: (callback : any) => void
  onUpdateWorkingDir: (callback : any) => void
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}