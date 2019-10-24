export const TOGGLE_GLOBAL_LOADING = 'TOGGLE_GLOBAL_LOADING'

export const toggleGlobalLoading = (status) => {
  return {
    type: TOGGLE_GLOBAL_LOADING,
    payload: {
      status
    }
  }
}
