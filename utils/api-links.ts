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
  workSessionMaterialChange: {
    create: `${meidoxApiUrl}/WorkSessionMaterialChange`,
    getWorkSessionMatertialChangeById: `${meidoxApiUrl}/WorkSessionMaterialChange`,
    updateWorkSessionMatertialChangeRemark: `${meidoxApiUrl}/WorkSessionMaterialChange/Remark`,
    completeWorkSessionMatertialChange: `${meidoxApiUrl}/WorkSessionMaterialChange/Complete`,
    getWorkSessionMatertialChangeByWsId: `${meidoxApiUrl}/WorkSessionMaterialChange/WorkSession`,
  },
  workSessionAdjustmentBegin: {
    create: `${meidoxApiUrl}/WorkSessionAdjustmentBegin`,
    getWorkSessionAdjustmentBeginById: `${meidoxApiUrl}/WorkSessionAdjustmentBegin`,
    updateWorkSessionAdjustmentBeginRemark: `${meidoxApiUrl}/WorkSessionAdjustmentBegin/Remark`,
    completeWorkSessionAdjustmentBegin: `${meidoxApiUrl}/WorkSessionAdjustmentBegin/Complete`,
    getWorkSessionAdjustmentBeginByWsId: `${meidoxApiUrl}/WorkSessionAdjustmentBegin/WorkSession`,
  },
  workSession4S: {
    create: `${meidoxApiUrl}/WorkSession4S`,
    getWorkSession4SById: `${meidoxApiUrl}/WorkSession4S`,
    updateWorkSession4SRemark: `${meidoxApiUrl}/WorkSession4S/Remark`,
    completeWorkSession4S: `${meidoxApiUrl}/WorkSession4S/Complete`,
    getWorkSession4SByWsId: `${meidoxApiUrl}/WorkSession4S/WorkSession`,
  },
  workSessionProductionPrepCheck: {
    create: `${meidoxApiUrl}/WorkSessionProductionPrepCheck`,
    getWorkSessionProductionPrepCheckById: `${meidoxApiUrl}/WorkSessionProductionPrepCheck`,
    updateWorkSessionProductionPrepCheckRemark: `${meidoxApiUrl}/WorkSessionProductionPrepCheck/Remark`,
    completeWorkSessionProductionPrepCheck: `${meidoxApiUrl}/WorkSessionProductionPrepCheck/Complete`,
    getWorkSessionProductionPrepCheckByWsId: `${meidoxApiUrl}/WorkSessionProductionPrepCheck/WorkSession`,
  },
  workSessionSorting: {
    create: `${meidoxApiUrl}/WorkSessionSorting`,
    getWorkSessionSortingById: `${meidoxApiUrl}/WorkSessionSorting`,
    updateWorkSessionSortingRemark: `${meidoxApiUrl}/WorkSessionSorting/Remark`,
    completeWorkSessionSorting: `${meidoxApiUrl}/WorkSessionSorting/Complete`,
    getWorkSessionSortingByWsId: `${meidoxApiUrl}/WorkSessionSorting/WorkSession`,
  },
};

export default apiLinks;
