import get from 'lodash/get';

import auth from 'utils/auth';

export const getExistedOrInitializeNewValues = (user = {}) => {
  const token = auth.getToken();
  let userProfile;

  const avatar = get(user, 'avatar', '') || '';
  const firstName = get(user, 'first_name', '') || '';
  const lastName = get(user, 'last_name', '') || '';

  const dateOfBirth = get(user, 'date_of_birth') ? new Date(get(user, 'date_of_birth')) : null;
  const idNumber = get(user, 'id_number', '') || '';
  const idFrontFile = get(user, 'id_front_url', '') || '';
  const idBackFile = get(user, 'id_back_url', '') || '';
  const phone = get(user, 'phone', '') || '';
  const email = get(user, 'email', '') || '';

  const streetAddress = get(user, 'address', '') || '';
  const provinceId = get(user, 'province_id', '');
  const districtId = get(user, 'district_id', '');
  const wardId = get(user, 'ward_id', '');
  const houseHoldUrls = get(user, 'house_hold_urls', '');

  const temporaryAddress = get(user, 'temporary_address', '') || '';
  const temporaryProvinceId = get(user, 'temporary_province_id', '');
  const temporaryDistrictId = get(user, 'temporary_district_id', '');
  const temporaryWardId = get(user, 'temporary_ward_id', '');

  const jobId = get(user, 'job_id', '') || null;
  const company = get(user, 'company', '') || '';
  const companyAddress = get(user, 'company_address', '') || '';
  const personalIncome = get(user, 'personal_income', '') || null;
  const receiveWageMethod = get(user, 'receive_wage_method') || null;
  const workStartYear = get(user, 'work_start_year') || null;
  const totalSalaryReceived = get(user, 'total_salary_received', '') || null;
  const insuranceMode = get(user, 'insurance_mode', '') || '';
  const salaryStatementUrls = get(user, 'salary_statement_urls', '') || '';

  const loanPlanUrls = get(user, 'loan_plan_urls', '') || '';
  const loanPlan = get(user, 'loan_plan', '') || '';

  userProfile = {
    firstName,
    lastName,
    dateOfBirth,
    idNumber,
    idFrontFile,
    idBackFile,
    phone,
    email,
    streetAddress,
    provinceId,
    districtId,
    wardId,
    houseHoldUrls,
    avatar,
    temporaryAddress,
    temporaryProvinceId,
    temporaryDistrictId,
    temporaryWardId,
    jobId,
    company,
    companyAddress,
    personalIncome,
    receiveWageMethod,
    workStartYear,
    totalSalaryReceived,
    insuranceMode,
    salaryStatementUrls,
    loanPlanUrls,
    loanPlan,
  };

  if (token && user) {
    userProfile = {
      ...userProfile,
      isAnonymousUser: false,
      isOptionLogin: false,
      isAcceptTerms: true,
    };
  } else {
    userProfile = {
      ...userProfile,
      isAnonymousUser: true,
      isOptionLogin: true,
      isAcceptTerms: false,
    };
  }

  return {
    ...userProfile,
    isCreateNewAccount: false,
  };
};
