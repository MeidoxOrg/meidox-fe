export const identityServerUrl = "https://meidox-identityserver.solocode.click";
export const meidoxApiUrl = "https://meidoxapi.solocode.click";

const apiLinks = {
  workShift: {
    getWorkShift: `${meidoxApiUrl}/WorkShift`,
  },
  machines: {
    getMachines: `${meidoxApiUrl}/Machine`,
  },
  worksession: {
    create: `${meidoxApiUrl}/WorkSession`,
    getById: `${meidoxApiUrl}/WorkSession`,
    createWorkSessionSetup: `${meidoxApiUrl}/WorkSessionSetup`,
    getWorkSessionSetupById: `${meidoxApiUrl}/WorkSessionSetup`,
    updateAdjustmentItemUnit: `${meidoxApiUrl}/AdjustmentItemUnit`,
    updateAdjustmentItemKg: `${meidoxApiUrl}/AdjustmentItemKg`,
    updateRemark: `${meidoxApiUrl}/Remark`,
    completeWorkSessionSetup: `${meidoxApiUrl}/Complete`,
    pauseWorkSessionSetup: `${meidoxApiUrl}/Pause`,
  },
};

export default apiLinks;
