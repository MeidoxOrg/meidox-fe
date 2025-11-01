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
    updateAdjustmentItemUnit: `${meidoxApiUrl}/WorkSessionSetup/AdjustmentItemUnit`,
    updateAdjustmentItemKg: `${meidoxApiUrl}/WorkSessionSetup/AdjustmentItemKg`,
    updateRemark: `${meidoxApiUrl}/WorkSessionSetup/Remark`,
    completeWorkSessionSetup: `${meidoxApiUrl}/WorkSessionSetup/Complete`,
    pauseWorkSessionSetup: `${meidoxApiUrl}/WorkSessionSetup/Pause`,
    workSessionSetupByWsId: `${meidoxApiUrl}/WorkSessionSetup/WorkSession`,
  },
  workSessionProduction: {
    create: `${meidoxApiUrl}/WorkSessionProduction`,
    getWorkSessionProductionById: `${meidoxApiUrl}/WorkSessionProduction`,
    updateNumberOfGoodProduct: `${meidoxApiUrl}/WorkSessionProduction/NumberOfGoodProduct`,
    updateCanNumber: `${meidoxApiUrl}/WorkSessionProduction/CanNumber`,
    updateRemark: `${meidoxApiUrl}/WorkSessionProduction/Remark`,
    completeWorkSessionProduction: `${meidoxApiUrl}/WorkSessionProduction/Complete`,
    pauseWorkSessionProduction: `${meidoxApiUrl}/WorkSessionProduction/Pause`,
    getWorkSessionProductionByWsId: `${meidoxApiUrl}/WorkSessionProduction/WorkSession`,
  },
  workSessionMoldChange: {
    create: `${meidoxApiUrl}/WorkSessionMoldChange`,
    getWorkSessionMoldChangeById: `${meidoxApiUrl}/WorkSessionMoldChange`,
    updateWorkSessionMoldChange: `${meidoxApiUrl}/WorkSessionMoldChange/Remark`,
    completeWorkSessionMoldChange: `${meidoxApiUrl}/WorkSessionMoldChange/Complete`,
    getWorkSessionMoldChangeByWsId: `${meidoxApiUrl}/WorkSessionMoldChange/WorkSession`,
  },
};

export default apiLinks;
