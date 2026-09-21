export type Screen = 'home'

export interface AppState {
  screen: Screen
}

export const initialState: AppState = {
  screen: 'home',
}
