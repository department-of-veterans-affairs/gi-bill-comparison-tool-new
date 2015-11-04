///////////////////////////////////////////////////////////////////////////////
// Calculator
///////////////////////////////////////////////////////////////////////////////
function Calculator(institution_type, institution) {
	// Estimator values
	// this.military_status = null;
	// this.spouse_active_duty = null;
	// this.number_of_depend = null;
  // this.post_911_elig = null;
  // this.cumulative_service = null;
  // this.enlistment_service = null;
  // this.consecutive_service = null;
  // this.institution_type = null;
  // this.country = null;
  // this.online = null;
  // this.bah = null;

  // Dependent Values
  // this.calc_old_gi_bill = null;
  // this.service_discharge = null;
  // this.calc_tier = null;
  // this.calc_vre_only = null;
  // this.monthly_rate = null;
  // this.only_tuition_fees = null;

  this.institution_type = institution_type.toLowerCase();
  this.institution = institution;

  this.getValues();
  this.getDerivedValues();
  this.resetVisibility();

  var othis = this;
  $(".filter-item").change(function() {
    othis.getValues();
    othis.getDerivedValues();
    othis.resetVisibility();
  });
}

///////////////////////////////////////////////////////////////////////////////
// Constants
///////////////////////////////////////////////////////////////////////////////

Calculator.prototype.BSCAP = 1000;
Calculator.prototype.TFCAP = 21084.89;
Calculator.prototype.FLTTFCAP = 12048.50;
Calculator.prototype.CORRESPONDTFCAP = 10241.22;

Calculator.prototype.MGIB3YRRATE = 1717;
Calculator.prototype.MGIB2YRRATE = 1395;
Calculator.prototype.SRRATE = 367;

Calculator.prototype.DEARATE = 1018;
Calculator.prototype.DEARATEOJT = 743;

Calculator.prototype.VRE0DEPRATE = 603.33;
Calculator.prototype.VRE1DEPRATE = 748.38;
Calculator.prototype.VRE2DEPRATE = 881.91;
Calculator.prototype.VREINCRATE = 64.28;
Calculator.prototype.VRE0DEPRATEOJT = 527.51;
Calculator.prototype.VRE1DEPRATEOJT = 637.92;
Calculator.prototype.VRE2DEPRATEOJT = 735.20;
Calculator.prototype.VREINCRATEOJT = 47.82;

// Estimator Ids
Calculator.prototype.MILITARY_STATUS = "#military-staus"
Calculator.prototype.GI_BILL_CHAPTER = "#gi-bill-chapter";
Calculator.prototype.ELIG_FOR_POST_GI_BILL = "#elig-for-post-gi-bill";
Calculator.prototype.CUMMULATIVE_SERVICE = "#cumulative-service";
Calculator.prototype.ENLISTMENT_SERVICE ="enlistment-service";
Calculator.prototype.CONSECUTIVE_SERVICE ="consecutive-service";

// Calculator Tuition
Calculator.prototype.TUITION_FEES_SECTION = "#tuition-fees-section";
Calculator.prototype.IN_STATE = "#in-state";
Calculator.prototype.TUITION_FEES_FORM = "#tuition-fees-form";
Calculator.prototype.IN_STATE_TUITION_FEES_FORM = "#in-state-tuition-fees-form";
Calculator.prototype.BOOKS_INPUT_ROW = "#books-input-row";
Calculator.prototype.YELLOW_RIBBON_RECIPIENT_FORM = "#yellow-ribbon-recipient-form";
Calculator.prototype.YELLOW_RIBBON_AMOUNT_FORM = "#yellow-ribbon-amount-form";
Calculator.prototype.YELLOW_RIBBON_RATES_LINK = "#yellow-ribbon-rates-link"
Calculator.prototype.SCHOLARSHIP_AMOUNT_FORM = "#scholarship-amount-form";
Calculator.prototype.TUITION_ASSIST_FORM = "#tuition-assist-form";

// Calculator Enrollment
Calculator.prototype.ENROLLMENT_SECTION = "#enrollment-section";
Calculator.prototype.ENROLLED_FORM = "#enrolled-form";
Calculator.prototype.ENROLLED_FORM_OLD_GI_BILL = "#enrolled-form-old-gi-bill";
Calculator.prototype.CALENDAR_FORM = "#calendar-form";
Calculator.prototype.WORKING_FORM = "#working-form";
Calculator.prototype.NUMBER_NON_TRADITIONAL_TERMS_FORM = "#number-non-traditional-terms-form";
Calculator.prototype.LENGTH_NON_TRADITIONAL_TERMS_FORM = "#length-non-traditional-terms-form";
Calculator.prototype.KICKER_ELIG_FORM = "#kicker-elig-form";
Calculator.prototype.KICKER_FORM = "#kicker-form";
Calculator.prototype.BUY_UP_FORM = "#buy-up-form";
Calculator.prototype.BUY_UP_RATE_FORM = "#buy-up-rate-form";

// Calculator Outputs
Calculator.prototype.CALC_HOUSING_ALLOW_RATE_ROW = "#calc-housing-allow-rate-row";
Calculator.prototype.CALC_TERM_TOTAL_ROW = "#calc-term-total-row";
Calculator.prototype.CALC_PAID_TO_SCHOOL_TOTAL_ROW = "#calc-paid-to-school-total-row";
Calculator.prototype.CALC_PAID_TO_YOU_TOTAL_ROW = "#calc-paid-to-you-total-row";
Calculator.prototype.CALC_OUT_OF_POCKET_ROW = "#calc-out-of-pocket-row";
Calculator.prototype.CALC_TUITION_FEES_CHARGED_ROW = "#calc-tuition-fees-charged-row";
Calculator.prototype.CALC_TUITION_FEES_SCHOLARSHIP_ROW = "#calc-tuition-fees-scholarship-row";
Calculator.prototype.CALC_SCHOOL_RECEIVED_ROW = "#calc-school-received-row";
Calculator.prototype.CALC_TUITION_FEES_ROW = "#calc-tuition-fees-row";
Calculator.prototype.CALC_YELLOW_RIBBON_ROW = "#calc-yellow-ribbon-row";
Calculator.prototype.CALC_YELLOW_RIBBON_VA_ROW = "#calc-yellow-ribbon-va-row";

// Class and control selectors
Calculator.prototype.TERM2 = ".term2";
Calculator.prototype.TERM3 = ".term3";
Calculator.prototype.TUITION_FEES_TERM_2 = "#tuition-fees-term-2";
Calculator.prototype.TUITION_FEES_TERM_3 = "#tuition-fees-term-3";
Calculator.prototype.YR_BEN_TERM_2 = "#yr-ben-term-2";
Calculator.prototype.YR_BEN_TERM_3 = "#yr-ben-term-3";
Calculator.prototype.YR_BEN_TERM_VA_2 = "#yr-ben-term-va-2";
Calculator.prototype.YR_BEN_TERM_VA_3 = "#yr-ben-term-va-3";
Calculator.prototype.HOUSING_ALLOW_TERM_2 = "#housing-allow-term-2";
Calculator.prototype.HOUSING_ALLOW_TERM_3 = "#housing-allow-term-3";
Calculator.prototype.BOOK_STIPEND_TERM_2 = "#book-stipend-term-2";
Calculator.prototype.BOOK_STIPEND_TERM_3 = "#book-stipend-term-3";

///////////////////////////////////////////////////////////////////////////////
// setValues
// Sets all calculator values.
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.getValues = function() {
  this.getGiBillChapter(this.GI_BILL_CHAPTER);
  this.getEligForPostGiBill(this.ELIG_FOR_POST_GI_BILL);
  this.getCumulativeService(this.CUMMULATIVE_SERVICE);
  this.getEnlistmentService(this.ENLISTMENT_SERVICE);
  this.getConsecutiveService(this.CONSECUTIVE_SERVICE);

  this.getInState(this.IN_STATE);
  this.getTuitionFees(this.TUITION_FEES_FORM);
  this.getInStateTuitionFees(this.IN_STATE_TUITION_FEES_FORM);
  this.getBooks(this.BOOKS_INPUT_ROW);
  this.getYellowRibbon(this.YELLOW_RIBBON_RECIPIENT_FORM);
  this.getYellowBen(this.YELLOW_RIBBON_AMOUNT_FORM);
  this.getScholar(this.SCHOLARSHIP_AMOUNT_FORM);
  this.getTuitionAssist(this.TUITION_ASSIST_FORM);
  this.getRop(this.ENROLLED_FORM);
  this.getRopOld(this.ENROLLED_FORM_OLD_GI_BILL);
  this.getCalendar(this.CALENDAR_FORM);
  this.getOjtWorking(this.WORKING_FORM);
  this.getNumberNontradTerms(this.NUMBER_NON_TRADITIONAL_TERMS_FORM);
  this.getLengthNontradTerms(this.LENGTH_NON_TRADITIONAL_TERMS_FORM);
  this.getKickerElig(this.KICKER_ELIG_FORM);
  this.getKicker(this.KICKER_FORM);
  this.getBuyUpElig(this.BUY_UP_FORM);
  this.getBuyUp(this.BUY_UP_RATE_FORM);

  // this.setCalcTermTotalRow(this.CALC_TERM_TOTAL_ROW);
  // this.setCalcPaidToSchoolTotalRow(this.CALC_PAID_TO_SCHOOL_TOTAL_ROW);
  // this.setCalcPaidToYouTotalRow(this.CALC_PAID_TO_YOU_TOTAL_ROW);
  // this.setCalcOutOfPocketRow(this.CALC_OUT_OF_POCKET_ROW);
  // this.setCalcTuitionFeesChargedRow(this.CALC_TUITION_FEES_CHARGED_ROW);
  // this.setCalcTuitionFeesScholarshipRow(this.CALC_TUITION_FEES_SCHOLARSHIP_ROW);
  // this.setCalcSchoolReceivedRow(this.CALC_SCHOOL_RECEIVED_ROW);
  // this.setCalcTuitionFeesRow(this.CALC_TUITION_FEES_ROW);
  // this.setCalcYellowRibbonRow(this.CALC_YELLOW_RIBBON_ROW);
  // this.setCalcYellowRibbonVaRow(this.CALC_YELLOW_RIBBON_VA_ROW);
}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.getDerivedValues = function() {
  this.getVreOnly();
  this.getOnlyTuitionFees();
  this.getMonthlyRate();
  this.getTier();
  this.getTuitionOutOfState();
  this.getNumberOfTerms();
  this.getTuitionNetPrice();
  this.getTuitionFeesCap();
  this.getTuitionFeesPerTerm();
  this.getTermLength();
  this.getAcadYearLength();
  this.getRopOld();
  this.getRopBook();
  this.getRopOjt();
  this.getYellowRibbonEligibility();
  this.getKickerBenefit();
  this.getBuyUpRate();
  this.getMonthlyRateFinal();
  this.getTerm1();
  this.getTerm2();
  this.getTerm3();
  this.getTerm4();
};

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.resetVisibility = function() {
  // Tuition/Fees Input Results
  $(this.TUITION_FEES_SECTION).show();
  $(this.IN_STATE).hide();
  $(this.IN_STATE_TUITION_FEES_FORM).hide();
  $(this.BOOKS_INPUT_ROW).hide();
  $(this.YELLOW_RIBBON_RECIPIENT_FORM).hide();
  $(this.YELLOW_RIBBON_AMOUNT_FORM).hide();
  $(this.YELLOW_RIBBON_RATES_LINK).hide();
  $(this.SCHOLARSHIP_AMOUNT_FORM).show();
  $(this.TUITION_ASSIST_FORM).hide();

  // Enrollment Inputs
  $(this.ENROLLMENT_SECTION).show();
  $(this.ENROLLED_FORM).show();
  $(this.ENROLLED_FORM_OLD_GI_BILL).hide();
  $(this.WORKING_FORM).hide();
  $(this.CALENDAR_FORM).show();
  $(this.NUMBER_NON_TRADITIONAL_TERMS_FORM).hide();
  $(this.LENGTH_NON_TRADITIONAL_TERMS_FORM).hide();
  $(this.KICKER_ELIG_FORM).show();
  $(this.KICKER_FORM).hide();
  $(this.BUY_UP_FORM).hide();
  $(this.BUY_UP_RATE_FORM).hide();

  // Calculator Results
  $(this.CALC_HOUSING_ALLOW_RATE_ROW).show();
  $(this.CALC_TERM_TOTAL_ROW).show();
  $(this.CALC_PAID_TO_YOU_TOTAL_ROW).show();
  $(this.CALC_PAID_TO_SCHOOL_TOTAL_ROW).show();

  $(this.CALC_OUT_OF_POCKET_ROW).show();
  $(this.CALC_TUITION_FEES_CHARGED_ROW).show();
  $(this.CALC_SCHOOL_RECEIVED_ROW).show();
  $(this.CALC_TUITION_FEES_SCHOLARSHIP_ROW).show();


  $(this.CALC_TUITION_FEES_ROW).show();
  $(this.CALC_YELLOW_RIBBON_ROW).show();
  $(this.CALC_YELLOW_RIBBON_VA_ROW).show();

  // Calculator Results - Particular classes and ids
  $(this.TERM2).show();
  $(this.TERM3).show();

  $(this.TUITION_FEES_TERM_2).show();
  $(this.TUITION_FEES_TERM_3).show();
  $(this.YR_BEN_TERM_2).show();
  $(this.YR_BEN_TERM_3).show();
  $(this.YR_BEN_TERM_VA_2).show();
  $(this.YR_BEN_TERM_VA_3).show();
  $(this.HOUSING_ALLOW_TERM_2).show();
  $(this.HOUSING_ALLOW_TERM_3).show();
  $(this.BOOK_STIPEND_TERM_2).show();
  $(this.BOOK_STIPEND_TERM_3).show();

  // Dependent Visibilities
  if (!this.calc_vre_only) {
    $(this.ENROLLED_FORM).show();
    $(this.ENROLLED_FORM_OLD_GI_BILL).hide();
    $(this.YELLOW_RIBBON_RECIPIENT_FORM).hide();
    $(this.YELLOW_RIBBON_AMOUNT_FORM).hide();
    $(this.YELLOW_RIBBON_RATES_LINK).hide();
    $(this.SCHOLARSHIP_AMOUNT_FORM).hide();
    $(this.TUITION_ASSIST_FORM).hide();
    $(this.CALC_YELLOW_RIBBON_ROW).hide();    
  }

  if (this.institution_type === 'ojt') {
    $(this.TUITION_FEES_SECTION).hide();
    $(this.ENROLLED_FORM).hide();
    $(this.ENROLLED_FORM_OLD_GI_BILL).hide();
    $(this.WORKING_FORM).show();
    $(this.CALENDAR_FORM).hide();
    $(this.TUITION_ASSIST_FORM).hide();
    $(this.CALC_TUITION_FEES_ROW).hide();
    $(this.CALC_YELLOW_RIBBON_ROW).hide();
    $(this.CALC_YELLOW_RIBBON_VA_ROW).hide();
    $(this.CALC_SCHOOL_RECEIVED_ROW).hide();
    $(this.CALC_PAID_TO_SCHOOL_TOTAL_ROW).hide();
    $(this.CALC_TUITION_FEES_SCHOLARSHIP_ROW).hide();
    $(this.CALC_TUITION_FEES_CHARGED_ROW).hide();
    $(this.CALC_OUT_OF_POCKET_ROW).hide();
    $(this.CALC_PAID_TO_YOU_TOTAL_ROW).hide();
    $(this.CALC_TERM_TOTAL_ROW).hide();
  }

  if (this.gi_bill_chapter == 35) {
    $(this.KICKER_ELIG_FORM).hide();
    $(this.KICKER_FORM).hide();
  }

  if (this.institution_type ==- 'flight' || this.institution_type === 'correspondence') {
    $(this.ENROLLED_FORM).hide();
    $(this.ENROLLED_FORM_OLD_GI_BILL).hide();
    $(this.KICKER_ELIG_FORM).hide();
    $(this.BUY_UP_FORM).hide();
  }

  if (this.institution_type == 'public') {
    $(this.IN_STATE).show();
    if (!this.in_state) {
      $(this.IN_STATE_TUITION_FEES_FORM).show();
    }
  }

  if (this.institution.yr && this.calc_tier == 1.0) {
    $(this.YELLOW_RIBBON_RECIPIENT_FORM).show();
    
    if (this.yellow_ribbon) {
      $(this.YELLOW_RIBBON_AMOUNT_FORM).show();
      $(this.YELLOW_RIBBON_RATES_LINK).show();
    }
  }

  if (this.institution_type !== 'ojt' && this.calendar === 'nontraditional') {
    $(this.NUMBER_NON_TRADITIONAL_TERMS_FORM).show();
    $(this.LENGTH_NON_TRADITIONAL_TERMS_FORM).show();
  }
    
  if (this.calc_old_gi_bill == true || this.calc_vre_only == true) {
    $(this.ENROLLED_FORM).hide();
    $(this.ENROLLED_FORM_OLD_GI_BILL).show();
    $(this.YELLOW_RIBBON_RECIPIENT_FORM).hide();
    $(this.YELLOW_RIBBON_AMOUNT_FORM).hide();
    $(this.YELLOW_RIBBON_RATES_LINK).hide();
    $(this.CALC_YELLOW_RIBBON_ROW).hide();
  }

  if (this.kicker_elig) {
    $(this.KICKER_FORM).show();
  }

  if (this.buy_up_elig) {
    $(this.BUY_UP_RATE_FORM).show();
  }

  if (this.gi_bill_chapter == 31) {
    $(this.BOOKS_INPUT_ROW).show();
  } else {
    $(this.BOOKS_INPUT_ROW).hide();
  }

  if (this.gi_bill_chapter == 30) {
    $(this.BUY_UP_FORM).show();
  } else {
    $(this.BUY_UP_FORM).hide();
    $(this.BUY_UP_RATE_FORM).hide();      
  }

  if ((this.military_status == 'active duty' ||
      this.military_status == 'national guard / reserves') &&
      this.gi_bill_chapter == 33) {
    $(this.TUITION_ASSIST_FORM).show();
  } else {
    $(this.TUITION_ASSIST_FORM).hide();
  }

  if (!this.calc_yellow_ribbon_elig) {
    $(this.CALC_YELLOW_RIBBON_ROW).hide();
    $(this.CALC_YELLOW_RIBBON_VA_ROW).hide();
  }

  if (this.calc_number_of_terms == 1) {
    $(this.TERM2).hide();
    $(this.TERM3).hide();
    $(this.TUITION_FEES_TERM_2).hide();
    $(this.TUITION_FEES_TERM_3).hide();
    $(this.YR_BEN_TERM_2).hide();
    $(this.YR_BEN_TERM_3).hide();
    $(this.YR_BEN_TERM_VA_2).hide();
    $(this.YR_BEN_TERM_VA_3).hide();
    $(this.HOUSING_ALLOW_TERM_2).hide();
    $(this.HOUSING_ALLOW_TERM_3).hide();
    $(this.BOOK_STIPEND_TERM_2).hide();
    $(this.BOOK_STIPEND_TERM_3).hide();
  }

  if (this.calc_number_of_terms < 3 && this.institution_type !== 'ojt') {
    $(this.TERM3).hide();
    $(this.TUITION_FEES_TERM_3).hide();
    $(this.YR_BEN_TERM_3).hide();
    $(this.YR_BEN_TERM_VA_3).hide();
    $(this.HOUSING_ALLOW_TERM_3).hide();
    $(this.BOOK_STIPEND_TERM_3).hide();
  }
};

///////////////////////////////////////////////////////////////////////////////
// formatCurrency
// Formats currency in USD
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.formatCurrency = function (num) {
  var str = Math.round(Number(num)).toString();
    
  // match a digit if it's followed by 3 other digits, appending a comma to each match
  return '<span class="estimator-dollar-sign">$</span>' + str.replace(/\d(?=(\d{3})+$)/g, '$&,');
};

///////////////////////////////////////////////////////////////////////////////
// getCurrency
// Converts a currency string to a number.
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.getCurrency = function (currency) {
  return Number(currency.replace(/[^0-9\.]+/g,''));
}

///////////////////////////////////////////////////////////////////////////////
// setMilitaryStatus
//
// Saves as number.
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.getMilitaryStatus = function(id) {
  this.military_status = $(id).val();

  return this;
};

///////////////////////////////////////////////////////////////////////////////
// getGiBillChapter
// Sets gi bill chapter value from the element with the id argument. Also sets
// the old_gi_bill boolean based on the value of the gi_bill_chapter.
//
// Saves as number.
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.getGiBillChapter = function(id) {
  this.gi_bill_chapter = Number($(id).val());
  this.calc_old_gi_bill = (this.gi_bill_chapter == 30 || this.gi_bill_chapter == 1607 
    || this.gi_bill_chapter == 1606 || this.gi_bill_chapter == 35);

  return this;
};

///////////////////////////////////////////////////////////////////////////////
// getEligForPostGiBill
// Sets gi bill chapter value from the element with the id argument.
//
// Saves as bool.
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.getEligForPostGiBill = function(id) {
  this.elig_for_post_gi_bill = $(id).val().toLowerCase() === 'yes';

  return this;
};

///////////////////////////////////////////////////////////////////////////////
// getCumulativeService
// Sets the cumulative service value from the element with the id argument.
//
// Saves as float.
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.getCumulativeService = function(id) {
  var val = $(id).val();

  this.service_discharge = val === "service discharge";
  this.cumulative_service = this.service_discharge ? 1.0 : parseFloat(val);

  return this;
};

///////////////////////////////////////////////////////////////////////////////
// getConsecutiveService
// Sets consecutive service value from the element with the id argument.
//
// Saves as number.
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.getConsecutiveService = function(id) {
  this.consecutive_service = Number($(id).val());

  return this;
};

///////////////////////////////////////////////////////////////////////////////
// getEnlistmentService
// Sets enlistment service value from the element with the id argument.
//
// Saves as number.
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.getEnlistmentService = function(id) {
  this.enlistment_service = Number($(id).val());
  return this;
};

///////////////////////////////////////////////////////////////////////////////
// getInState
// Sets the value and visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.getInState = function(id) {
  this.in_state = $(id + " :input:checked").val().toLowerCase() === "yes";
  return this;
};

///////////////////////////////////////////////////////////////////////////////
// getTuitionFees
// Sets the value and visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.getTuitionFees = function(id) {
  this.tuition_fees = this.getCurrency($(id + " :input").val());

  return this;
};

///////////////////////////////////////////////////////////////////////////////
// getInStateTuitionFees
// Sets the value and visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.getInStateTuitionFees = function(id) {
  this.in_state_tuition_fees = this.getCurrency($(id + " :input").val());

  return this;
};

///////////////////////////////////////////////////////////////////////////////
// getBooks
// Sets the value and visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.getBooks = function(id) {
  this.books = this.getCurrency($(id + " :input").val());

  return this;
};

///////////////////////////////////////////////////////////////////////////////
// getYellowRibbon
// Sets the value and visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.getYellowRibbon = function(id) {
  this.yellow_ribbon = $(id + " :input:checked").val().toLowerCase() === "yes";

  return this;
};

///////////////////////////////////////////////////////////////////////////////
// getYellowBen
// Sets the value and visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.getYellowBen = function(id) {
  this.yellow_ben = this.getCurrency($(id + " :input").val());
  return this;
};

///////////////////////////////////////////////////////////////////////////////
// getScholar
// Sets the value and visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.getScholar = function(id) {
  this.scholar = Number($(id + " :input").val());
  return this;
};

///////////////////////////////////////////////////////////////////////////////
// getTuitionAssist
// Sets the visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.getTuitionAssist = function(id) {
  this.tuition_assist = $(id + " :input").val();
  return this;
};

///////////////////////////////////////////////////////////////////////////////
// getRop
// Sets the visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.getRop = function(id) {
  this.rop = Number($(id + " :input").val());
  return this;
};

///////////////////////////////////////////////////////////////////////////////
// getRopOld
// Sets the visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.getRopOld = function(id) {
  this.rop_old = $(id + " :input").val();
  return this;
};

///////////////////////////////////////////////////////////////////////////////
// getCalendar
// Sets the visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.getCalendar = function(id) {
  this.calendar = $(id + " :input").val();
  return this;
};

///////////////////////////////////////////////////////////////////////////////
// getOjtWorking
// Sets the visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.getOjtWorking = function(id) {
  this.ojt_working = $(id + " :input").val();
  return this;
};

///////////////////////////////////////////////////////////////////////////////
// getNumberNontradTerms
// Sets the visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.getNumberNontradTerms = function(id) {
  this.number_nontrad_terms = Number($(id + " :input").val());
  return this;
};

///////////////////////////////////////////////////////////////////////////////
// getLengthNontradTerms
// Sets the visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.getLengthNontradTerms = function(id) {
  this.number_nontrad_terms = $(id + " :input").val();
  return this;
};

///////////////////////////////////////////////////////////////////////////////
// getKickerElig
// Sets the visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.getKickerElig = function(id) {
  this.kicker_elig = $(id + " :input:checked").val().toLowerCase() === "yes";
  return this;
};

///////////////////////////////////////////////////////////////////////////////
// getKicker
// Sets the visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.getKicker = function(id) {
  this.kicker = this.getCurrency($(id + " :input").val());
  return this;
};

///////////////////////////////////////////////////////////////////////////////
// getBuyUpElig
// Sets the visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.getBuyUpElig = function(id) {
  this.buy_up_elig = $(id + " :input:checked").val().toLowerCase() === "yes";
  return this;
};

///////////////////////////////////////////////////////////////////////////////
// getBuyUp
// Sets the visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.getBuyUp = function(id) {
  this.buy_up = Number($(id + " :input").val());

  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setCalcTermTotalRow
// Sets the visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setCalcTermTotalRow = function(id) {
  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setCalcPaidToSchoolTotalRow
// Sets the visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setCalcPaidToSchoolTotalRow = function(id) {
  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setCalcPaidToYouTotalRow
// Sets the visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setCalcPaidToYouTotalRow = function(id) {
  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setCalcOutOfPocketRow
// Sets the visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setCalcOutOfPocketRow = function(id) {

  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setCalcTuitionFeesChargedRow
// Sets the visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setCalcTuitionFeesChargedRow = function(id) {
  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setCalcTuitionFeesScholarshipRow
// Sets the visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setCalcTuitionFeesScholarshipRow = function(id) {
  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setCalcSchoolReceivedRow
// Sets the visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setCalcSchoolReceivedRow = function(id) {
  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setCalcTuitionFeesRow
// Sets the visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setCalcTuitionFeesRow = function(id) {
  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setCalcYellowRibbonRow
// Sets the visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setCalcYellowRibbonRow = function(id) {
  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setCalcYellowRibbonVaRow
// Sets the visibility for the element with the id argument.
//
// Saves as boolean
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.setCalcYellowRibbonVaRow = function(id) {
  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setVreOnly
// Calculate if eligible for VR&E and Post-9/11 Benefits.
//
// Saves as boolean.
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.getVreOnly = function () {
  this.calc_vre_only = (this.gi_bill_chapter == 31 && !this.elig_for_post_gi_bill);
  return this;
};

///////////////////////////////////////////////////////////////////////////////
// getOnlyTuitionFees
// Calculate if monthly benefit can only be spent on tuition/fees
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.getOnlyTuitionFees = function () {
  if (this.military_status === 'active duty' && 
      (this.gi_bill_chapter == 30 || this.gi_bill_chapter == 1607)) {
    this.calc_only_tuition_fees = true;
  } else if ((this.institution_type === 'correspond' || 
      this.institution_type === 'flight') && this.calc_old_gi_bill == true) {
    this.calc_only_tuition_fees = true;    
  } else if ((this.rop_old === "less than half" || this.rop_old === "quarter") && 
      (this.gi_bill_chapter == 30 || this.gi_bill_chapter == 1607 || this.gi_bill_chapter == 35)) {
    this.calc_only_tuition_fees = true;
  } else {
      this.calc_only_tuition_fees = false;
  }
};

///////////////////////////////////////////////////////////////////////////////
// getMonthlyRate
// Calculate the monthly benefit rate for non-chapter 33 benefits
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.getMonthlyRate = function ( ) {
  if (this.gi_bill_chapter == 30 && this.enlistment_service == 3 && this.institution_type === 'ojt' ) {
      this.calc_monthlyrate = this.MGIB3YRRATE * 0.75;  
  } else if (this.gi_bill_chapter == 30 && this.enlistment_service == 3 ) {
      this.calc_monthlyrate = this.MGIB3YRRATE;
  } else if (this.gi_bill_chapter == 30 && this.enlistment_service == 2 && this.institution_type === 'ojt') {
      this.calc_monthlyrate = this.MGIB2YRRATE * 0.75;
  } else if (this.gi_bill_chapter == 30 && this.enlistment_service == 2 ) {
      this.calc_monthlyrate = this.MGIB2YRRATE;
  } else if (this.gi_bill_chapter == 1607 && this.institution_type === 'ojt') {
      this.calc_monthlyrate = this.MGIB3YRRATE * this.consecutive_service * 0.75;
  } else if (this.gi_bill_chapter == 1607 ) {
      this.calc_monthlyrate = this.MGIB3YRRATE* this.consecutive_service;
  } else if (this.gi_bill_chapter == 1606 && this.institution_type === 'ojt') {
      this.calc_monthlyrate = this.SRRATE * 0.75;
  } else if (this.gi_bill_chapter == 1606 ) {
      this.calc_monthlyrate = this.SRRATE;
  } else if (this.gi_bill_chapter == 35 && this.institution_type === 'ojt') {
      this.calc_monthlyrate = this.DEARATEOJT;
  } else if (this.gi_bill_chapter == 35 && this.institution_type === 'flight') {
      this.calc_monthlyrate = 0;
  } else if (this.gi_bill_chapter == 35) {
      this.calc_monthlyrate = this.DEARATE;
  } else if (this.gi_bill_chapter == 31 && this.number_of_depend == 0 && this.institution_type === 'ojt') {
      this.calc_monthlyrate = this.VRE0DEPRATEOJT;
  } else if (this.gi_bill_chapter == 31 && this.number_of_depend == 0) {
      this.calc_monthlyrate = this.VRE0DEPRATE;
  } else if (this.gi_bill_chapter == 31 && this.number_of_depend == 1 && this.institution_type === 'ojt') {
      this.calc_monthlyrate = this.VRE1DEPRATEOJT;
  } else if (this.gi_bill_chapter == 31 && this.number_of_depend == 1) {
      this.calc_monthlyrate = this.VRE1DEPRATE;
  } else if (this.gi_bill_chapter == 31 && this.number_of_depend == 2 && this.institution_type === 'ojt') {
      this.calc_monthlyrate = this.VRE2DEPRATEOJT;
  } else if (this.gi_bill_chapter == 31 && this.number_of_depend == 2) {
      this.calc_monthlyrate = this.VRE2DEPRATE;
  } else if (this.gi_bill_chapter == 31 && this.number_of_depend > 2 && this.institution_type === 'ojt') {
      this.calc_monthlyrate = this.VRE2DEPRATEOJT + ((this.number_of_depend-2) * Vthis.REINCRATEOJT) ;
  } else if (this.gi_bill_chapter == 31 && this.number_of_depend > 2) {
      this.calc_monthlyrate = this.VRE2DEPRATE + ((this.number_of_depend-2) * this.VREINCRATE) ;
  }
};


///////////////////////////////////////////////////////////////////////////////
// getTier
// Calculates the tier.
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.getTier = function () {
  if (this.gi_bill_chapter == 31 && this.post_911_elig == true)
    this.calc_tier = 1;
  else
    this.calc_tier = parseFloat(this.cumulative_service);
  
  return this;
};

///////////////////////////////////////////////////////////////////////////////
// getTuitionOutOfState
// Calculate the prepopulated value out-of-state tuiton rates
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.getTuitionOutOfState = function () {
  this.calc_tuition_out_of_state = this.institution.tuition_out_of_state;

  return this;
};

///////////////////////////////////////////////////////////////////////////////
// getNumberOfTerms
// Calculate the total number of academic terms
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.getNumberOfTerms = function () {
  if (this.institution_type === 'ojt')
    this.calc_number_of_terms = 3;
  else if (this.calendar === 'semesters')
    this.calc_number_of_terms = 2;
  else if (this.calendar == 'quarters')
    this.calc_number_of_terms = 3;
  else if (this.calendar == 'nontraditional') {
    this.calc_number_of_terms = this.number_nontrad_terms;
  }

  return this;
};

///////////////////////////////////////////////////////////////////////////////
// getTuitionNetPrice
// Set the net price (Payer of Last Resort)
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.getTuitionNetPrice = function () {
  this.calc_tuition_net_price = Math.max(0, Math.min(
    this.tuition_fees - this.scholar - this.tuition_assist
  ));

  return this;
};

///////////////////////////////////////////////////////////////////////////////
// getTuitionFeesCap
// Set the proper tuition/fees cap
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.getTuitionFeesCap = function () {
  if (this.institution_type === 'flight') {
    this.calc_tuition_fees_cap = this.FLTTFCAP;
  } else if (this.institution_type === 'correspondence') {
    this.calc_tuition_fees_cap = this.CORRESPONDTFCAP;
  } else if (this.institution_type === 'public' && 
        this.institution.country.toLowerCase() === 'usa' && this.in_state) {
    this.calc_tuition_fees_cap = this.tuition_fees;
  } else if (this.institution_type === 'public' && 
        this.institution.country.toLowerCase() === 'usa' && !this.in_state) {
    this.calc_tuition_fees_cap = this.in_state_tuition_fees;
  } else if (this.institution_type === 'private' || this.institution_type === 'foreign') {
    this.calc_tuition_fees_cap = this.TFCAP;
  }

  return this;
};

///////////////////////////////////////////////////////////////////////////////
// getTuitionFeesPerTerm
// Calculate the tuition/fees per term
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.getTuitionFeesPerTerm = function () {
  this.calc_tuition_fees_per_term = this.tuition_fees / this.calc_number_of_terms;

  return this;
};

///////////////////////////////////////////////////////////////////////////////
// getTermLength
// Calculate the length of each term
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.getTermLength = function () {
  if (this.calendar == 'semesters') {
    this.calc_term_length = 4.5;
  } else if (this.calendar === 'quarters')  {
    this.calc_term_length = 3;
  } else if (this.calendar === 'nontraditional') {
    this.calc_term_length = this.length_nontrad_terms;
  } else if (this.institution_type === 'ojt') {
    this.calc_term_length = 6;
  }

  return this;
};

///////////////////////////////////////////////////////////////////////////////
// getAcadYearLength
// Calculate the length of the academic year
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.getAcadYearLength = function () {
  if (this.calendar === 'nontraditional') {
    this.calc_acad_year_length = this.number_nontrad_terms * this.length_nontrad_terms;
  } else {
    this.calc_acad_year_length = 9;
  }

  return this;
};

///////////////////////////////////////////////////////////////////////////////
// getRopOld
// Calculate the rate of pursuit for Old GI Bill
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.getRopOld = function () {
  if (this.institution_type === 'ojt') {
    this.calc_rop_old = this.ojt_working / 30;
  } else if (this.rop_old === "full") {
    this.rop_old = 1;
  } else if (this.rop_old === "three quarter") {
    this.calc_rop_old = 0.75;
  } else if (this.rop_old === "half") {
    this.calc_rop_old = 0.50;
  } else if (this.rop_old === "less than half") {
    this.calc_rop_old = 0.50;
  } else if (this.rop_old === "quarter") {
    this.calc_rop_old = 0.25;
  }

  return this;
};

///////////////////////////////////////////////////////////////////////////////
// getRopBook
// Calculate the rate of pursuit for Book Stipend
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.getRopBook = function () {
  if (this.rop == 1) {
    this.calc_rop_book = 1;
  } else if (this.rop == 0.8) {
    this.calc_rop_book = 0.75;
  } else if (this.rop == 0.6) {
    this.calc_rop_book = 0.50;
  } else if (this.rop == 0) {
    this.calc_rop_book = 0.25;
  }

  return this;
};

///////////////////////////////////////////////////////////////////////////////
// getRopOjt
// Calculate the rate of pursuit for OJT
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.getRopOjt = function () {
  this.calc_rop_ojt = this.ojt_working / 30;

  return this;
};

///////////////////////////////////////////////////////////////////////////////
// setYellowRibbonEligibility
// Determine yellow ribbon eligibility
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.getYellowRibbonEligibility = function () {
  if (this.calc_tier < 1 || !this.institution.yr || !this.yellow_ribbon 
      || this.military_status === 'active duty') {
    this.calc_yellow_ribbon_elig = false;
  }
  else if (this.institution_type === 'ojt' || this.institution_type === 'flight' || 
      this.institution_type === 'correspondence') {
    this.calc_yellow_ribbon_elig = false;
  } else {
    this.calc_yellow_ribbon_elig = true;
  }

  return this;
};

///////////////////////////////////////////////////////////////////////////////
// getKickerBenefit
// Determine kicker benefit level
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.getKickerBenefit = function () {
  if (!this.kicker_elig) {
    this.calc_kicker_benefit = 0;
  } else if (this.institution_type === 'ojt') {
    this.calc_kicker_benefit = this.kicker * this.calc_rop_ojt;
  } else if (this.calc_old_gi_bill == true || this.calc_vre_only == true) {
    this.calc_kicker_benefit = this.kicker * this.calc_rop_old;
  } else {
    this.calc_kicker_benefit = this.kicker * this.rop;
  }

  return this;
};
  
///////////////////////////////////////////////////////////////////////////////
// getBuyUpRate
// Determine buy up rates
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.getBuyUpRate = function () {
  if (!this.buy_up_elig) {
    this.calc_buy_up_rate = 0;
  } else if (this.gi_bill_chapter !== 30) {
    this.calc_buy_up_rate = 0;
  } else {
    this.calc_buy_up_rate = (this.buy_up / 4);
  }

  return this;
};

///////////////////////////////////////////////////////////////////////////////
// Calculate Housing Allowance Rate Final
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.getMonthlyRateFinal = function () {
  this.calc_monthly_rate_final = this.calc_rop_old * 
    ((this.calc_monthlyrate + this.calc_buy_up_rate)  + this.calc_kicker_benefit);

  return this;
};

///////////////////////////////////////////////////////////////////////////////
// Calculate the name of Term #1
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.getTerm1 = function () {
    if (this.institution_type == 'ojt') {
      this.calc_term1 = 'Months 1-6';
    } else if (this.calendar == 'semesters') {
      this.calc_term1 = 'Fall';
    } else if (this.calendar == 'quarters') {
      this.calc_term1 = 'Fall';
    } else if (this.calendar == 'nontraditional') {
      this.calc_term1 = 'Term 1';
    }
  };

///////////////////////////////////////////////////////////////////////////////
// Calculate the name of Term #2
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.getTerm2 = function () {
    if (this.institution_type == 'ojt') {
      this.calc_term2 = 'Months 7-12';
    } else if (this.calendar == 'semesters') {
      this.calc_term2 = 'Spring';
    } else if (this.calendar == 'quarters')  {
      this.calc_term2 = 'Winter';
    } else if (this.calendar == 'nontraditional') {
      this.calc_termterm2 = 'Term 2';
    }
  };

///////////////////////////////////////////////////////////////////////////////
// Calculate the name of Term #3
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.getTerm3 = function () {
    if (this.institution_type == 'ojt') {
      this.calc_term3 = 'Months 13-18';
    } else if (this.calendar == 'semesters') {
      this.calc_term3 = '';
    } else if (this.calendar == 'quarters')  {
      this.calc_term3 = 'Spring';
    } else if (this.calendar == 'nontraditional') {
      this.calc_term3 = 'Term 3';
    }
  };

///////////////////////////////////////////////////////////////////////////////
// Calculate the name of Term #4
///////////////////////////////////////////////////////////////////////////////
Calculator.prototype.getTerm4 = function () {
    if (this.institution_type == 'ojt') {
      this.calc_term4 = 'Months 19-24';
    } else {
      this.calc_term4 = 'Total (/Yr)';
    }
  };