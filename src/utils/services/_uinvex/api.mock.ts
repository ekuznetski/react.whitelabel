export const mockData = {
  clients: {
    getProfile: {
      response: {
        status: 'success',
        message: {
          email: 'ralph.melhem@eu.hycm.com',
          username: 'ralph.melhem@eu.hycm.com',
          first_name: 'ralph',
          surname: 'test',
          country: 'Canada',
          state: 'AB',
          street: 'qfvdf',
          city: 'j',
          postcode: '123456',
          phone_prefix: '+44',
          phone: '555477393',
          dob: '1990-03-22',
          account_type: 'Raw',
          affiliate_code: null,
          raf_id: 'HYCP+343129583030',
          nationality: 'France',
          dual_nationality: 'N/A',
          ic_hash: '7da1bca61204e52f1ea71011b2b0285a20eb693cfee0db603e760aafaea0c4fd',
          jurisdiction: 'St Vincent',
          userId: '03a8f9fd7b33d725512532877d17d82261643288a4d557d4c0897ecf40154b4a',
          sfid: '001D0000027iZ4KIAU',
          ftd: true,
          trading_central: true,
          aprv: true,
          curr: 'EUR',
          brand: 'HYCM',
          manager: 'Chind',
          regDate: '2019-08-09 09:36:01',
          go_to_praxis: true,
          show_praxis_and_webmoney: false,
          enable_citioptions: false,
          allow_additional_account: true,
          allow_additional_live_account: true,
          allow_additional_demo_account: true,
          allow_deposit: true,
          allowed_currencies: ['CAD', 'EUR', 'USD', 'GBP', 'AED', 'RUB'],
          allowed_leverages: [100, 200, 300, 400, 500],
          allowed_account_types: ['fixed', 'classic', 'raw'],
          allowed_platforms: ['mt4', 'mt5'],
          allow_withdrawal: true,
          allow_internal_transfer: true,
          edit_fake_account: true,
          validation_countdown: null,
        },
        messageCode: 54,
      },
    },
    editProfile: {
      response: {
        status: 'success',
        message: 'The profile has been updated',
        messageCode: 12,
        data: {
          email: 'ralph.melhem@eu.hycm.com',
          username: 'ralph.melhem@eu.hycm.com',
          first_name: 'ralph',
          surname: 'test',
          country: 'Canada',
          state: 'AB',
          street: 'qfvdf',
          city: 'j',
          postcode: '123456',
          phone_prefix: '+44',
          phone: '555477393',
          dob: '1990-03-22',
          account_type: 'Raw',
          affiliate_code: null,
          raf_id: 'HYCP+343129583030',
          nationality: 'France',
          dual_nationality: 'N/A',
          ic_hash: '7da1bca61204e52f1ea71011b2b0285a20eb693cfee0db603e760aafaea0c4fd',
          jurisdiction: 'St Vincent',
          userId: '03a8f9fd7b33d725512532877d17d82261643288a4d557d4c0897ecf40154b4a',
          sfid: '001D0000027iZ4KIAU',
          ftd: true,
          trading_central: true,
          aprv: true,
          curr: 'EUR',
          brand: 'HYCM',
          manager: 'Chind',
          regDate: '2019-08-09 09:36:01',
          go_to_praxis: true,
          show_praxis_and_webmoney: false,
          enable_citioptions: false,
          allow_additional_account: true,
          allow_additional_live_account: true,
          allow_additional_demo_account: true,
          allow_deposit: true,
          allowed_currencies: ['CAD', 'EUR', 'USD', 'GBP', 'AED', 'RUB'],
          allowed_leverages: [100, 200, 300, 400, 500],
          allowed_account_types: ['fixed', 'classic', 'raw'],
          allowed_platforms: ['mt4', 'mt5'],
          allow_withdrawal: true,
          allow_internal_transfer: true,
          edit_fake_account: true,
        },
      },
    },
    getClientData: {
      response: {
        status: 'success',
        fp_status: { code: 1, message: 'Submitted' },
        document_status: { code: 1, message: 'Submitted' },
        client_status: { code: 5, message: 'The Client is Approved' },
        cayman_status: { code: 10, message: 'Under review' },
        edd_status: { code: 1, message: 'Submitted' },
        mifir_status: { code: 4, message: 'Not applicable' },
        tins_status: { code: 1, message: 'Submitted' },
        dual_status: { code: 4, message: 'Not applicable' },
        edd_data: {
          address: 'House no 289, st no 16, phase1, Bahria Town Rawalpindi',
          own_property: '0',
          previous_address: 'House no 909, st no 43, block C, PWD housing society islamabad',
          nature_of_business: 'financial consultant',
          years_employment: '15',
          working_financial: '0',
          annual_income: null,
          estimated_amount: null,
          net_worth: null,
          income_currency: null,
          appr_annual_income: 'Below 50,000',
          appr_net_worth: 'Below 250,000',
          years_address: '1',
          employer_name: 'Business development system',
          position: 'managing director',
          employer_address: 'office no 3, 1st floor, kashmir mansion, commercial area phase 1',
          appr_income_before_tax: null,
          appr_savings: null,
          funds_available: 'Below 25,000',
          other_income: 'IB hycm',
          employment_status: 'SelfEmplyed',
          phone: '03339347925',
          pr_employer_name: 'sdad',
          pr_nature_of_business: 'asdsasd',
          pr_position: 'asd',
          pr_appr_annual_income: '250,000 to 500,000',
          pr_location_employment: 'ads',
          pr_years_employment: '1',
          nationality: 'Pakistan',
        },
        tins_data: {
          choice: true,
          reason: null,
          tins: [
            { country: 'Andorra', tax_number: 'asd' },
            { country: 'Albania', tax_number: 'sdfs' },
          ],
        },
      },
    },
    getTradingAccounts: {
      response: {
        status: 'success',
        message: [
          {
            Platform: 'Mt4',
            AccountId: '1000001998',
            Group: 'CMdemoMktGBP',
            Leverage: '400',
            Balance: 0,
            Currency: 'GBP',
            Type: 'Demo',
            AccountType: 'Classic',
            Min_withdrawal: 20,
            AllowLeverageChange: false,
          },
          {
            Platform: 'Mt4',
            AccountId: '220001127',
            Group: 'SVINT-S',
            Leverage: '500',
            Balance: 381,
            Currency: 'USD',
            Type: 'Live',
            AccountType: 'Fixed',
            Min_withdrawal: 20,
            AllowLeverageChange: true,
          },
          {
            Platform: 'Mt4',
            AccountId: '220001225',
            Group: 'SVIEU-S-EUR',
            Leverage: '400',
            Balance: 10021,
            Currency: 'EUR',
            Type: 'Live',
            AccountType: 'Fixed',
            Min_withdrawal: 20,
            AllowLeverageChange: true,
          },
          {
            Platform: 'Mt4',
            AccountId: '220001226',
            Group: 'SVVGB-S-GBP',
            Leverage: '400',
            Balance: 10021,
            Currency: 'GBP',
            Type: 'Live',
            AccountType: 'Classic',
            Min_withdrawal: 20,
            AllowLeverageChange: true,
          },
          {
            Platform: 'Mt4',
            AccountId: '220001227',
            Group: 'SVVAE-S-AED',
            Leverage: '500',
            Balance: 37200,
            Currency: 'AED',
            Type: 'Live',
            AccountType: 'Classic',
            Min_withdrawal: 100,
            AllowLeverageChange: true,
          },
          {
            Platform: 'Mt4',
            AccountId: '220001228',
            Group: 'SVVRU-S-RUB',
            Leverage: '300',
            Balance: 76800,
            Currency: 'RUB',
            Type: 'Live',
            AccountType: 'Classic',
            Min_withdrawal: 1200,
            AllowLeverageChange: true,
          },
          {
            Platform: 'Mt4',
            AccountId: '220001229',
            Group: 'SVICD-S-CAD',
            Leverage: '400',
            Balance: 70,
            Currency: 'CAD',
            Type: 'Live',
            AccountType: 'Fixed',
            Min_withdrawal: 20,
            AllowLeverageChange: true,
          },
        ],
        totalBalance: 134493,
        balances: { EUR: 10021, USD: 381, GBP: 10021, AED: 37200, RUB: 76800, CAD: 70 },
        totalDemoBalance: 0,
        balancesDemo: { EUR: 0, USD: 0, GBP: 0, AED: 0, RUB: 0, CAD: 0 },
        messageCode: 54,
        promotions: [
          { name: 'deposit_promotion', type: 'percentage', value: 10 },
          { name: 'fp_promotion', type: 'fixed', value: 20 },
          { name: 'sms_promotion', type: 'fixed', value: 20 },
        ],
      },
    },
    bankingStatements: {
      meta: { code: 200, in: 28.9191 },
      response: {
        status: 'success',
        message: 'Reports Sent',
        data: {
          trades: [
            {
              amount: '200',
              currency: 'USD',
              date_created: '2018-09-11 11:27:00',
              invoice_no: 'EP_7869311536665220',
              trade_account: '300003591',
              trade_platform: 'MT4',
            },
          ],
          deposits: [
            {
              amount: '200',
              currency: 'USD',
              date_created: '2018-09-11 11:27:00',
              invoice_no: 'EP_7869311536665220',
              trade_account: '300003591',
              trade_platform: 'MT4',
            },
            {
              amount: '423',
              currency: 'USD',
              date_created: '2018-11-06 08:16:18',
              invoice_no: 'GC_69089767',
              trade_account: '520000009',
              trade_platform: 'MT5',
            },
            {
              amount: '10',
              currency: 'USD',
              date_created: '2018-11-06 09:12:48',
              invoice_no: 'iat_15414955657549',
              trade_account: '520000010',
              trade_platform: 'MT5',
            },
          ],
        },
        messageCode: 54,
      },
    },
    changePassword: {
      response: {
        status: 'success',
        message: 'The password has been updated successfully',
        messageCode: 14,
      },
    },
    updateTins: {
      response: {
        status: 'success',
        message: {
          choice: true,
          reason: null,
          tins: '[{"country":"Aland Islands","tax_number":"123456"}]',
        },
        messageCode: 54,
      },
    },
    settings: {
      response: {
        status: 'success',
        message: {
          allowed_currencies: ['USD'],
          allowed_leverages: [100, 500],
          allowed_platforms: ['mt5'],
          allowed_account_types: ['fixed', 'variable'],
          jurisdiction: 'St Vincent',
        },
        messageCode: 0,
      },
    },
    sendReferrerLink: {
      response: {
        status: 'success',
      },
    },
  },
  withdrawals: {
    getHistory: {
      response: {
        status: 'success',
        message: [
          {
            reference: 'WD_15760597803044',
            account: '320000742',
            currency: 'USD',
            amount: 3000,
            date: '2019-11-10 12:08:54',
            status_code: 0,
            cancelable: true,
            subtotal: 0,
            details: [],
          },
          {
            reference: 'iat_15728621438301',
            account: '6701151',
            currency: 'USD',
            amount: 34,
            date: '2019-11-09 12:09:08',
            status_code: 1,
            cancelable: false,
            subtotal: 0,
            details: [],
          },
          {
            reference: 'IAT#From360000041-15728621438300',
            account: '360000041',
            currency: 'USD',
            amount: 29,
            date: '2019-08-16',
            status_code: 2,
            cancelable: false,
            subtotal: 29,
            details: [
              {
                settlement_date: '2019-08-16',
                reference: 'IAT#From360000041-15728621438300',
                method: 'Credit Card: 0058',
                amount: 29,
              },
            ],
          },
          {
            reference: 'WD#HYCM15658363931603',
            account: '360000041',
            currency: 'USD',
            amount: 557,
            date: '2019-08-16',
            status_code: 2,
            cancelable: false,
            subtotal: 557,
            details: [
              {
                settlement_date: '2019-08-16',
                reference: 'WD#HYCM15658363931603',
                method: 'Wallet: MoneyBooker',
                amount: 457,
              },
              {
                settlement_date: '2019-08-16',
                reference: 'WD#HYCM15658363931111',
                method: 'Wallet: MoneyBooker',
                amount: 100,
              },
            ],
          },
        ],
        messageCode: 0,
      },
    },
    limit: {
      response: {
        status: 'success',
        message: 'Withdrawal Limit',
        data: 87.8,
        messageCode: 36,
      },
    },
    mt4: {
      response: {
        status: 'success',
        message: 'Withdrawal Successful',
        messageCode: 44,
      },
    },
    mt5: {
      response: {
        status: 'failure',
        message: 'Withdrawal Unsuccessful',
        messageCode: 44,
      },
    },
  },
  mt4accounts: {
    create: {
      response: {
        status: 'success',
        message: 'Trading account created',
        messageCode: 35,
        data: { trade_account_id: '220002709', Currency: 'CAD', pwd: 'pHFCxQjk', platform: 'MT4' },
      },
    },
    demo: {
      create: {
        response: {
          status: 'failure',
          message: 'Similar Account already exist',
          messageCode: 35,
        },
      },
    },
  },
  edd: {
    submit: {
      response: {
        status: 'success',
        message: {
          address: 'asd',
          own_property: '1',
          previous_address: 'asd',
          nature_of_business: 'asd',
          years_employment: '1',
          working_financial: '1',
          annual_income: null,
          estimated_amount: null,
          net_worth: null,
          income_currency: null,
          appr_annual_income: 'Below 50,000',
          appr_net_worth: 'Below 250,000',
          years_address: '1',
          employer_name: 'asd',
          position: 'asd',
          employer_address: 'asd',
          appr_income_before_tax: null,
          appr_savings: null,
          funds_available: 'Below 25,000',
          other_income: 'asd',
          employment_status: 'Travel Agency',
          phone: '1123123123',
          pr_employer_name: 'asd',
          pr_nature_of_business: 'asd',
          pr_position: 'asd',
          pr_appr_annual_income: 'Below 50,000',
          pr_location_employment: 'asd',
          pr_years_employment: '123',
          nationality: 'United Arab Emirates',
        },
        messageCode: 54,
      },
    },
  },
  bankDetails: {
    get: {
      response: {
        status: 'success',
        message: {
          beneficiary_name: 'Ralph test new bis',
          beneficiary_bank: 'testbank with time new',
          beneficiary_bank_account_no: '12345454',
          swift_code: 'CTBAAU2S',
          iban: '4124124124',
          branch_name: 'sds(test) & test -',
          branch_address: 'dsfsdf / 123, Test',
        },
        messageCode: 25,
      },
    },
    update: {
      response: {
        status: 'success',
        message: 'Bank Account added successfully',
        messageCode: 23,
        data: {
          beneficiary_name: '12323',
          beneficiary_bank: 'test',
          beneficiary_bank_account_no: '1234',
          swift_code: 'aaasas34sa2',
          iban: 'test',
          branch_name: 'test',
          branch_address: 'test',
        },
      },
    },
  },
  v2: {
    documents: {
      upload: {
        response: {
          status: 'success',
          message: [{ id: '102559', document_type: 'ID', document_status: 'Pending', created: '2020-10-30 11:03:23' }],
          messageCode: 54,
        },
      },
      getDocuments: {
        response: {
          status: 'success',
          message: [],
          messageCode: 31,
        },
      },
    },
  },
  partnership: {
    add: {
      response: {
        status: 'failure',
        message: 'Error message',
      },
    },
  },
  ibs: {
    addIB: {
      response: {
        status: 'failure',
        message: 'Unexpected Error occured, please try again later',
        messageCode: 4,
      },
    },
  },
  frontend: {
    xwayz: {
      country: 'Cyprus',
      countryCode: 'CY',
      phonePrefix: '357',
      dynamicLeverage: false,
      leverages: ['100', '200', '300', '400', '500'],
      currencies: ['USD', 'EUR'],
      jurisdiction: 'CySec',
      companyName: 'HYCM (Europe) Ltd',
      domain: 'eu',
      redirect_popup: false,
      redirect_url: null,
      redirect_url_full: 'https:///en',
      passive_consent: false,
      allowed_account_types: ['fixed', 'classic', 'raw'],
    },
  },
  graphs: {
    homepage: {
      Forex: {
        USDCADv: {
          points:
            '0 60,8 38,16 18,24 9,32 11,40 0,48 2,56 33,64 28,72 61,80 66,88 105,96 115,104 56,112 100,120 55,128 56,136 32,144 48,152 105,160 121,168 114,176 153,184 158,192 147,200 163,208 153,216 160,224 180,232 164,240 155,248 152,256 154,264 135,272 132,280 140,288 160,296 183,304 200,312 188,320 198,328 177,336 192,344 194,352 184,360 168,368 164,376 172,384 172,392 184,400 184,408 188,416 171,424 176,432 187,440 163,448 165,456 158,464 184,472 135',
          details: { name: 'USD/CAD', bid: 1.32348, ask: 1.3236, variation: 20 },
        },
        EURJPYv: {
          points:
            '0 0,8 37,16 33,24 34,32 28,40 60,48 43,56 52,64 59,72 34,80 34,88 2,96 48,104 93,112 76,120 102,128 97,136 146,144 157,152 160,160 158,168 200,176 169,184 156,192 164,200 177,208 171,216 158,224 148,232 155,240 156,248 171,256 147,264 154,272 167,280 165,288 126,296 89,304 71,312 92,320 91,328 96,336 98,344 122,352 129,360 131,368 128,376 126,384 122,392 120,400 118,408 128,416 130,424 120,432 85,440 79,448 88,456 75,464 79,472 88',
          details: { name: 'EUR/JPY', bid: 126.003, ask: 126.029, variation: -0.18 },
        },
        NZDUSDv: {
          points:
            '0 0,8 1,16 48,24 70,32 65,40 99,48 108,56 80,64 88,72 54,80 43,88 9,96 33,104 120,112 87,120 125,128 141,136 141,144 152,152 119,160 117,168 118,176 90,184 80,192 89,200 70,208 74,216 65,224 69,232 79,240 101,248 109,256 139,264 163,272 198,280 174,288 140,296 108,304 107,312 61,320 58,328 90,336 88,344 102,352 120,360 159,368 152,376 128,384 107,392 130,400 154,408 183,416 189,424 186,432 177,440 185,448 170,456 170,464 200,472 188',
          details: { name: 'NZD/USD', bid: 0.65187, ask: 0.6521, variation: -0.37 },
        },
        USDJPYv: {
          points:
            '0 10,8 28,16 23,24 2,32 0,40 11,48 27,56 19,64 61,72 60,80 90,88 96,96 89,104 127,112 103,120 87,128 96,136 73,144 95,152 111,160 138,168 109,176 158,184 170,192 162,200 172,208 184,216 191,224 160,232 142,240 132,248 131,256 154,264 144,272 152,280 151,288 147,296 138,304 116,312 100,320 127,328 136,336 123,344 150,352 178,360 175,368 159,376 154,384 163,392 173,400 188,408 191,416 199,424 200,432 177,440 178,448 167,456 174,464 156,472 157',
          details: { name: 'USD/JPY', bid: 106.332, ask: 106.34, variation: -0.2 },
        },
        AUDUSDv: {
          points:
            '0 120,8 96,16 103,24 128,32 139,40 110,48 143,56 143,64 103,72 97,80 72,88 49,96 11,104 1,112 77,120 40,128 76,136 85,144 98,152 115,160 91,168 84,176 90,184 48,192 52,200 59,208 43,216 60,224 51,232 60,240 100,248 132,256 138,264 123,272 164,280 180,288 165,296 155,304 125,312 143,320 163,328 130,336 200,344 116,352 129,360 152,368 154,376 127,384 103,392 72,400 45,408 40,416 46,424 50,432 34,440 18,448 24,456 10,464 0,472 20',
          details: { name: 'AUD/USD', bid: 0.71855, ask: 0.71864, variation: 0.17 },
        },
        GBPUSDv: {
          points:
            '0 21,8 16,16 22,24 140,32 200,40 170,48 175,56 170,64 129,72 149,80 70,88 51,96 16,104 0,112 77,120 108,128 175,136 174,144 200,152 167,160 110,168 138,176 104,184 43,192 46,200 55,208 57,216 63,224 89,232 89,240 103,248 108,256 113,264 109,272 130,280 145,288 138,296 120,304 103,312 103,320 102,328 91,336 132,344 91,352 105,360 113,368 130,376 123,384 120,392 118,400 96,408 96,416 93,424 97,432 108,440 31,448 47,456 55,464 63,472 69',
          details: { name: 'GBP/USD', bid: 1.30778, ask: 1.30788, variation: -0.06 },
        },
        EURGBPv: {
          points:
            '0 125,8 117,16 173,24 60,32 0,40 14,48 37,56 26,64 42,72 30,80 44,88 56,96 54,104 103,112 119,120 73,128 28,136 47,144 76,152 114,160 150,168 148,176 198,184 200,192 187,200 177,208 185,216 158,224 141,232 145,240 149,248 154,256 141,264 121,272 100,280 104,288 118,296 82,304 67,312 54,320 59,328 59,336 36,344 52,352 47,360 54,368 55,376 65,384 53,392 42,400 41,408 35,416 43,424 45,432 36,440 72,448 55,456 54,464 44,472 43',
          details: { name: 'EUR/GBP', bid: 0.90605, ask: 0.90621, variation: 0.1 },
        },
        USDCHFv: {
          points:
            '0 157,8 117,16 85,24 63,32 5,40 39,48 0,56 28,64 15,72 40,80 70,88 95,96 104,104 94,112 26,120 43,128 68,136 105,144 27,152 54,160 121,168 98,176 98,184 145,192 170,200 172,208 176,216 186,224 183,232 190,240 176,248 176,256 172,264 173,272 171,280 166,288 160,296 183,304 186,312 192,320 192,328 200,336 179,344 197,352 190,360 170,368 150,376 137,384 143,392 149,400 162,408 164,416 149,424 156,432 146,440 191,448 192,456 188,464 190,472 188',
          details: { name: 'USD/CHF', bid: 0.90831, ask: 0.90845, variation: -0.04 },
        },
        EURUSDv: {
          points:
            '0 64,8 51,16 107,24 119,32 124,40 106,48 134,56 117,64 91,72 103,80 41,88 34,96 0,104 26,112 109,120 99,128 126,136 139,144 186,152 188,160 164,168 189,176 200,184 147,192 138,200 139,208 145,216 131,224 142,232 143,240 162,248 167,256 162,264 142,272 143,280 161,288 163,296 118,304 91,312 81,320 84,328 75,336 93,344 68,352 75,360 90,368 107,376 106,384 96,392 82,400 67,408 61,416 67,424 69,432 77,440 28,448 30,456 36,464 33,472 40',
          details: { name: 'EUR/USD', bid: 1.18507, ask: 1.18509, variation: 0.04 },
        },
      },
      Indices: {
        US500v: {
          points:
            '0 173,8 163,16 166,24 166,32 166,40 166,48 180,56 200,64 200,72 180,80 163,88 144,96 136,104 193,112 156,120 176,128 140,136 186,144 156,152 136,160 126,168 153,176 146,184 136,192 156,200 146,208 156,216 156,224 153,232 163,240 170,248 180,256 186,264 193,272 193,280 193,288 190,296 163,304 153,312 163,320 130,328 133,336 133,344 160,352 140,360 140,368 126,376 113,384 103,392 96,400 110,408 110,416 113,424 116,432 110,440 23,448 0,456 20,464 80,472 90',
          details: { name: 'US 500 Index', bid: 3377.83, ask: 3378.28, variation: 0.19 },
        },
        FRA40v: {
          points:
            '0 151,8 132,16 130,24 127,32 126,40 106,48 97,56 127,64 171,72 166,80 124,88 150,96 106,104 103,112 185,120 135,128 187,136 84,144 200,152 88,160 77,168 63,176 100,184 54,192 17,200 4,208 0,216 21,224 22,232 49,240 77,248 79,256 79,264 88,272 93,280 72,288 85,296 73,304 89,312 91,320 110,328 147,336 132,344 122,352 139,360 102,368 81,376 112,384 99,392 64,400 41,408 71,416 95,424 92,432 96,440 80,448 76,456 67,464 53,472 53',
          details: { name: 'France 40 Index', bid: 4967.2, ask: 4969.2, variation: 0.37 },
        },
        US30v: {
          points:
            '0 129,8 109,16 108,24 106,32 112,40 115,48 126,56 142,64 163,72 167,80 148,88 125,96 96,104 100,112 158,120 106,128 134,136 118,144 179,152 152,160 135,168 120,176 148,184 152,192 148,200 168,208 162,216 170,224 173,232 168,240 180,248 174,256 180,264 189,272 195,280 200,288 194,296 191,304 148,312 141,320 151,328 119,336 123,344 125,352 153,360 138,368 137,376 123,384 110,392 93,400 94,408 103,416 96,424 101,432 104,440 116,448 22,456 0,464 24,472 59',
          details: { name: 'US 30 Index', bid: 27931.7, ask: 27935.2, variation: 0.18 },
        },
        UK100v: {
          points:
            '0 200,8 191,16 182,24 162,32 153,40 137,48 126,56 137,64 161,72 162,80 142,88 149,96 129,104 113,112 157,120 120,128 140,136 83,144 149,152 90,160 62,168 52,176 44,184 56,192 56,200 70,208 88,216 88,224 91,232 91,240 93,248 83,256 92,264 90,272 93,280 92,288 107,296 113,304 98,312 98,320 112,328 91,336 88,344 110,352 89,360 68,368 56,376 74,384 99,392 107,400 119,408 113,416 108,424 97,432 66,440 62,448 41,456 25,464 0,472 23',
          details: { name: 'UK 100 Index', bid: 6126.5, ask: 6128, variation: 1.2 },
        },
        JPN225v: {
          points:
            '0 75,8 69,16 69,24 63,32 57,40 52,48 52,56 63,64 75,72 75,80 57,88 57,96 40,104 31,112 81,120 46,128 52,136 46,144 92,152 63,160 52,168 34,176 72,184 69,192 57,200 75,208 63,216 57,224 28,232 0,240 5,248 26,256 40,264 40,272 49,280 55,288 60,296 72,304 40,312 46,320 72,328 49,336 43,344 81,352 200,360 142,368 127,376 89,384 115,392 110,400 121,408 127,416 121,424 118,432 104,440 98,448 69,456 60,464 63,472 75',
          details: { name: 'Japan 225', bid: 23121.5, ask: 23135.5, variation: 0 },
        },
        US100v: {
          points:
            '0 200,8 197,16 176,24 180,32 177,40 175,48 165,56 170,64 176,72 172,80 157,88 169,96 161,104 148,112 181,120 166,128 165,136 141,144 155,152 143,160 126,168 121,176 147,184 134,192 126,200 136,208 128,216 131,224 125,232 121,240 120,248 124,256 131,264 134,272 134,280 133,288 129,296 131,304 115,312 103,320 98,328 79,336 80,344 73,352 88,360 82,368 80,376 75,384 67,392 64,400 61,408 74,416 73,424 74,432 76,440 78,448 19,456 0,464 1,472 49',
          details: { name: 'US 100 Index', bid: 11218.3, ask: 11219.3, variation: 0.6 },
        },
        ITA40sep19: {
          points:
            '0 164,8 180,16 177,24 184,32 169,40 166,48 177,56 195,64 190,72 187,80 184,88 190,96 192,104 200,112 195,120 190,128 196,136 193,144 187,152 187,160 184,168 182,176 171,184 168,192 164,200 163,208 152,216 155,224 174,232 185,240 196,248 171,256 155,264 139,272 110,280 120,288 129,296 110,304 97,312 91,320 123,328 126,336 67,344 91,352 126,360 116,368 126,376 94,384 89,392 62,400 92,408 0,416 8,424 20,432 33,440 17,448 8,456 17,464 14,472 14',
          details: { name: 'Italy 40 Index', bid: 22156.5, ask: 22168.5, variation: 1.06 },
        },
        GER30sep19: {
          points:
            '0 115,8 124,16 110,24 110,32 124,40 134,48 122,56 124,64 116,72 114,80 122,88 130,96 120,104 127,112 122,120 137,128 134,136 142,144 188,152 196,160 185,168 171,176 156,184 128,192 170,200 146,208 147,216 126,224 136,232 161,240 169,248 186,256 176,264 200,272 186,280 184,288 184,296 132,304 141,312 149,320 143,328 86,336 60,344 46,352 57,360 61,368 74,376 87,384 56,392 44,400 36,408 4,416 10,424 10,432 47,440 21,448 4,456 6,464 8,472 0',
          details: { name: 'Germany 30 Index', bid: 12453.3, ask: 12455.3, variation: 0.35 },
        },
        CN300aug19: {
          points:
            '0 186,26 176,52 200,78 148,104 117,130 121,156 84,182 55,208 77,234 77,260 81,286 82,312 72,338 55,364 37,390 14,416 11,442 0,468 133',
          details: { name: 'China 300 Index', bid: 3687.6, ask: 3690.6, variation: 0.41 },
        },
      },
      Commodities: {
        USCOT_Fv: {
          points:
            '0 93,8 107,16 96,24 93,32 93,40 95,48 93,56 92,64 91,72 88,80 96,88 93,96 106,104 113,112 200,120 177,128 194,136 185,144 151,152 165,160 163,168 175,176 165,184 174,192 157,200 157,208 153,216 131,224 151,232 170,240 118,248 94,256 5,264 26,272 63,280 60,288 64,296 60,304 25,312 40,320 5,328 17,336 14,344 9,352 15,360 15,368 13,376 20,384 16,392 10,400 6,408 5,416 0,424 19,432 21,440 25,448 46,456 47,464 74,472 66',
          details: { name: 'US Cotton ', bid: 61.56, ask: 62.66, variation: 1.09 },
        },
        XAUUSDv: {
          points:
            '0 173,8 173,16 176,24 171,32 171,40 168,48 156,56 153,64 156,72 163,80 155,88 183,96 148,104 143,112 192,120 200,128 183,136 171,144 177,152 145,160 127,168 121,176 93,184 87,192 92,200 89,208 94,216 86,224 75,232 75,240 70,248 69,256 75,264 69,272 66,280 77,288 69,296 61,304 49,312 48,320 24,328 18,336 52,344 0,352 25,360 26,368 8,376 94,384 87,392 89,400 142,408 134,416 141,424 134,432 96,440 86,448 91,456 78,464 78,472 85',
          details: { name: 'XAU/USD', bid: 1954.95, ask: 1955.3, variation: 0.52 },
        },
        BRENT_Fv: {
          points:
            '0 33,8 23,16 33,24 20,32 33,40 13,48 13,56 13,64 26,72 46,80 66,88 106,96 126,104 140,112 140,120 119,128 146,136 166,144 169,152 156,160 186,168 179,176 200,184 193,192 193,200 200,208 179,216 179,224 173,232 169,240 173,248 173,256 166,264 173,272 186,280 186,288 169,296 159,304 153,312 153,320 143,328 126,336 126,344 140,352 146,360 140,368 153,376 99,384 99,392 93,400 93,408 86,416 86,424 86,432 36,440 0,448 39,456 46,464 63,472 46',
          details: { name: 'Brent Oil', bid: 44.63, ask: 44.66, variation: -0.09 },
        },
        USCOF_Fv: {
          points:
            '0 27,8 23,16 23,24 21,32 24,40 21,48 56,56 60,64 53,72 87,80 93,88 83,96 81,104 83,112 79,120 90,128 103,136 107,144 119,152 138,160 116,168 116,176 112,184 143,192 147,200 136,208 136,216 123,224 150,232 172,240 200,248 198,256 192,264 173,272 167,280 156,288 155,296 156,304 149,312 156,320 155,328 153,336 98,344 109,352 116,360 116,368 124,376 124,384 119,392 112,400 115,408 89,416 86,424 101,432 100,440 75,448 86,456 39,464 26,472 0',
          details: { name: 'US Coffee', bid: 113.37, ask: 113.78, variation: 0.8 },
        },
        COPPER_Fv: {
          points:
            '0 200,8 154,16 160,24 160,32 148,40 160,48 154,56 148,64 165,72 177,80 165,88 182,96 188,104 182,112 194,120 182,128 188,136 182,144 194,152 154,160 148,168 160,176 154,184 148,192 102,200 120,208 79,216 79,224 79,232 68,240 74,248 68,256 85,264 74,272 91,280 97,288 74,296 62,304 28,312 11,320 5,328 0,336 34,344 17,352 17,360 17,368 17,376 34,384 28,392 5,400 34,408 57,416 68,424 74,432 79,440 51,448 39,456 45,464 39,472 45',
          details: { name: 'Copper', bid: 2.883, ask: 2.891, variation: 0.94 },
        },
        XAGUSDv: {
          points:
            '0 200,8 189,16 190,24 179,32 177,40 182,48 165,56 168,64 170,72 165,80 151,88 159,96 139,104 131,112 184,120 173,128 183,136 178,144 195,152 180,160 158,168 182,176 176,184 137,192 117,200 127,208 94,216 75,224 69,232 74,240 70,248 51,256 66,264 45,272 57,280 77,288 48,296 37,304 3,312 13,320 3,328 0,336 87,344 44,352 60,360 43,368 51,376 118,384 112,392 110,400 159,408 155,416 151,424 152,432 116,440 85,448 72,456 54,464 55,472 59',
          details: { name: 'XAG/USD', bid: 27.06, ask: 27.087, variation: 2.57 },
        },
        USOIL_Fv: {
          points:
            '0 25,8 18,16 25,24 18,32 29,40 10,48 7,56 0,64 21,72 43,80 47,88 98,96 116,104 123,112 127,120 116,128 141,136 163,144 163,152 149,160 178,168 170,176 192,184 196,192 192,200 200,208 170,216 174,224 170,232 163,240 167,248 170,256 167,264 167,272 185,280 185,288 163,296 160,304 156,312 152,320 138,328 127,336 127,344 134,352 145,360 134,368 145,376 149,384 149,392 152,400 156,408 181,416 163,424 156,432 109,440 101,448 94,456 87,464 87,472 76',
          details: { name: 'Crude Oil Spot', bid: 41.92, ask: 41.95, variation: -0.33 },
        },
        NATGAS_Fv: {
          points:
            '0 108,8 82,16 91,24 73,32 86,40 86,48 73,56 52,64 104,72 108,80 104,88 139,96 156,104 165,112 152,120 160,128 186,136 169,144 191,152 200,160 195,168 195,176 173,184 200,192 195,200 186,208 173,216 152,224 169,232 173,240 134,248 121,256 117,264 121,272 143,280 143,288 126,296 117,304 104,312 117,320 91,328 100,336 82,344 104,352 95,360 104,368 117,376 126,384 134,392 126,400 143,408 156,416 178,424 182,432 182,440 34,448 26,456 0,464 17,472 34',
          details: { name: 'Natural Gas', bid: 2.339, ask: 2.354, variation: 0.72 },
        },
        USSUGoct19: {
          points:
            '0 175,8 141,16 175,24 200,32 158,40 166,48 183,56 191,64 191,72 166,80 175,88 166,96 175,104 133,112 116,120 91,128 91,136 108,144 58,152 125,160 166,168 175,176 200,184 191,192 191,200 183,208 175,216 175,224 141,232 133,240 66,248 50,256 50,264 58,272 50,280 41,288 25,296 41,304 16,312 0,320 33,328 74,336 74,344 41,352 33,360 25,368 41,376 58,384 74,392 33,400 33,408 41,416 33,424 25,432 16,440 33,448 41,456 41,464 50,472 58',
          details: { name: 'Us Sugar', bid: 10.89, ask: 10.94, variation: 1.29 },
        },
      },
      Stocks: {
        CFD_MSFT: {
          points:
            '0 48,8 27,16 14,24 24,32 44,40 45,48 48,56 61,64 52,72 40,80 51,88 62,96 65,104 83,112 46,120 44,128 32,136 52,144 51,152 17,160 7,168 23,176 0,184 37,192 51,200 71,208 43,216 59,224 61,232 52,240 62,248 84,256 64,264 83,272 110,280 117,288 123,296 156,304 188,312 196,320 200,328 194,336 186,344 176,352 164,360 179,368 161,376 154,384 145,392 76,400 127,408 171,416 85,424 77,432 80,440 110,448 95,456 106,464 129,472 126',
          details: { name: 'Microsoft', bid: 208.5, ask: 208.72, variation: -0.63 },
        },
        CFD_AAPL: {
          points:
            '0 126,8 102,16 80,24 77,32 85,40 99,48 97,56 104,64 116,72 113,80 124,88 118,96 108,104 125,112 99,120 86,128 69,136 67,144 57,152 33,160 27,168 54,176 30,184 62,192 71,200 73,208 134,216 150,224 134,232 114,240 112,248 135,256 131,264 148,272 158,280 161,288 150,296 187,304 200,312 193,320 175,328 165,336 164,344 136,352 156,360 160,368 146,376 127,384 117,392 86,400 94,408 122,416 6,424 8,432 0,440 9,448 4,456 10,464 10,472 19',
          details: { name: 'Apple', bid: 459.18, ask: 459.54, variation: 1.49 },
        },
        CFD_TWTR: {
          points:
            '0 114,8 109,16 107,24 107,32 112,40 97,48 100,56 104,64 109,72 114,80 109,88 87,96 80,104 92,112 31,120 31,128 17,136 7,144 14,152 31,160 24,168 21,176 0,184 2,192 14,200 70,208 102,216 85,224 90,232 87,240 70,248 78,256 51,264 51,272 51,280 68,288 60,296 95,304 117,312 117,320 114,328 121,336 126,344 114,352 158,360 173,368 168,376 180,384 200,392 143,400 156,408 151,416 2,424 2,432 9,440 7,448 7,456 7,464 12,472 19',
          details: { name: 'Twitter', bid: 37.84, ask: 37.92, variation: 1.03 },
        },
        CFD_FB: {
          points:
            '0 67,8 52,16 50,24 58,32 73,40 67,48 79,56 82,64 89,72 92,80 84,88 71,96 63,104 54,112 23,120 20,128 35,136 41,144 35,152 19,160 0,168 23,176 8,184 49,192 95,200 109,208 82,216 76,224 79,232 48,240 46,248 60,256 56,264 70,272 80,280 73,288 83,296 102,304 129,312 145,320 145,328 146,336 119,344 125,352 147,360 182,368 187,376 181,384 175,392 121,400 166,408 200,416 24,424 47,432 51,440 72,448 64,456 47,464 104,472 80',
          details: { name: 'Facebook', bid: 260.77, ask: 261.06, variation: -0.14 },
        },
        CFD_TSLA: {
          points:
            '0 187,8 173,16 164,24 148,32 169,40 171,48 173,56 176,64 177,72 182,80 195,88 169,96 172,104 178,112 178,120 173,128 182,136 183,144 190,152 174,160 180,168 192,176 163,184 171,192 200,200 182,208 132,216 147,224 144,232 124,240 107,248 128,256 119,264 148,272 155,280 145,288 158,296 165,304 179,312 169,320 174,328 170,336 175,344 150,352 149,360 147,368 154,376 158,384 143,392 109,400 86,408 92,416 26,424 13,432 0,440 32,448 41,456 56,464 53,472 48',
          details: { name: 'Tesla', bid: 1650.75, ask: 1651.95, variation: 5.12 },
        },
        CFD_GOOG: {
          points:
            '0 0,8 5,16 21,24 9,32 30,40 25,48 38,56 43,64 51,72 48,80 60,88 57,96 62,104 76,112 62,120 54,128 38,136 44,144 46,152 47,160 25,168 50,176 4,184 30,192 95,200 74,208 79,216 107,224 115,232 96,240 81,248 113,256 98,264 105,272 120,280 124,288 114,296 135,304 173,312 162,320 158,328 174,336 168,344 182,352 198,360 192,368 189,376 200,384 167,392 125,400 143,408 141,416 1,424 11,432 15,440 22,448 18,456 13,464 23,472 23',
          details: { name: 'Google', bid: 1504.58, ask: 1506.45, variation: -0.22 },
        },
        CFD_JD: {
          points:
            '0 85,8 64,16 50,24 44,32 79,40 67,48 53,56 64,64 60,72 56,80 62,88 28,96 26,104 14,112 4,120 5,128 1,136 16,144 30,152 0,160 2,168 32,176 9,184 59,192 78,200 85,208 133,216 147,224 127,232 126,240 115,248 124,256 121,264 146,272 155,280 152,288 155,296 155,304 193,312 181,320 180,328 187,336 186,344 168,352 181,360 194,368 195,376 180,384 152,392 126,400 169,408 196,416 174,424 180,432 162,440 181,448 185,456 182,464 200,472 188',
          details: { name: 'Jd.com', bid: 62, ask: 62.04, variation: -1.74 },
        },
        CFD_BABA: {
          points:
            '0 85,8 40,16 37,24 17,32 41,40 37,48 32,56 36,64 34,72 56,80 65,88 50,96 25,104 11,112 18,120 15,128 30,136 30,144 49,152 20,160 18,168 71,176 0,184 68,192 77,200 124,208 86,216 114,224 83,232 75,240 65,248 83,256 57,264 81,272 102,280 91,288 95,296 72,304 104,312 102,320 111,328 108,336 81,344 65,352 119,360 131,368 149,376 119,384 104,392 61,400 90,408 200,416 133,424 171,432 142,440 170,448 165,456 155,464 168,472 163',
          details: { name: 'Alibaba', bid: 253.79, ask: 254.06, variation: -0.68 },
        },
        CFD_AMZN: {
          points:
            '0 52,8 24,16 24,24 26,32 41,40 36,48 42,56 42,64 55,72 51,80 62,88 59,96 60,104 64,112 53,120 43,128 47,136 61,144 45,152 35,160 13,168 27,176 0,184 33,192 72,200 95,208 109,216 107,224 106,232 110,240 105,248 118,256 108,264 129,272 141,280 136,288 142,296 164,304 181,312 176,320 177,328 178,336 158,344 162,352 175,360 185,368 187,376 186,384 200,392 173,400 167,408 158,416 83,424 82,432 70,440 78,448 77,456 77,464 95,472 98',
          details: { name: 'Amazon', bid: 3145.7, ask: 3148.36, variation: -0.68 },
        },
      },
      Crypto: {
        BTCUSD: {
          points:
            '0 157,8 148,16 128,24 143,32 176,40 144,48 127,56 136,64 139,72 164,80 143,88 110,96 136,104 159,112 59,120 84,128 86,136 50,144 47,152 71,160 96,168 80,176 30,184 68,192 78,200 78,208 44,216 55,224 73,232 63,240 105,248 110,256 103,264 94,272 114,280 93,288 0,296 53,304 85,312 64,320 59,328 56,336 88,344 121,352 97,360 65,368 200,376 156,384 151,392 150,400 182,408 159,416 105,424 84,432 121,440 156,448 152,456 132,464 101,472 81',
          details: { name: 'BTC/USD', bid: 11883, ask: 11908, variation: 0.49 },
        },
        BABUSD: {
          points:
            '0 200,8 194,16 180,24 159,32 177,40 175,48 151,56 152,64 169,72 176,80 104,88 56,96 59,104 67,112 30,120 41,128 34,136 29,144 25,152 45,160 64,168 47,176 15,184 48,192 45,200 43,208 28,216 29,224 38,232 31,240 54,248 60,256 44,264 36,272 46,280 21,288 0,296 16,304 37,312 18,320 11,328 12,336 35,344 46,352 39,360 25,368 87,376 70,384 60,392 77,400 68,408 53,416 43,424 33,432 46,440 68,448 69,456 38,464 21,472 8',
          details: { name: 'BAB/USD', bid: 314.26, ask: 315.46, variation: 4.54 },
        },
        LTCUSD: {
          points:
            '0 169,8 177,16 176,24 187,32 200,40 180,48 170,56 188,64 183,72 193,80 146,88 139,96 158,104 168,112 124,120 124,128 108,136 88,144 98,152 100,160 112,168 100,176 66,184 98,192 100,200 105,208 81,216 84,224 104,232 84,240 115,248 119,256 129,264 122,272 154,280 86,288 53,296 66,304 85,312 63,320 47,328 49,336 70,344 76,352 68,360 39,368 143,376 127,384 127,392 154,400 109,408 39,416 30,424 16,432 24,440 40,448 34,456 21,464 4,472 0',
          details: { name: 'LTC/USD', bid: 64.37, ask: 64.57, variation: 4.69 },
        },
        XRPUSD: {
          points:
            '0 180,8 154,16 154,24 169,32 169,40 138,48 98,56 126,64 95,72 109,80 45,88 33,96 42,104 87,112 45,120 64,128 70,136 42,144 25,152 47,160 64,168 78,176 25,184 73,192 84,200 84,208 53,216 47,224 64,232 61,240 95,248 107,256 101,264 76,272 90,280 42,288 0,296 19,304 59,312 42,320 19,328 28,336 67,344 87,352 87,360 47,368 200,376 95,384 90,392 98,400 73,408 78,416 56,424 33,432 70,440 98,448 95,456 67,464 22,472 19',
          details: { name: 'XRP/USD', bid: 0.302, ask: 0.3035, variation: 1.87 },
        },
        ETHUSD: {
          points:
            '0 92,8 92,16 77,24 89,32 118,40 90,48 86,56 101,64 109,72 127,80 109,88 77,96 94,104 102,112 43,120 66,128 69,136 34,144 39,152 55,160 73,168 69,176 0,184 55,192 59,200 40,208 21,216 35,224 49,232 34,240 72,248 79,256 62,264 45,272 76,280 55,288 16,296 72,304 104,312 104,320 81,328 102,336 138,344 155,352 148,360 137,368 200,376 171,384 163,392 185,400 184,408 168,416 145,424 135,432 158,440 193,448 180,456 159,464 138,472 129',
          details: { name: 'ETH/USD', bid: 427.96, ask: 429.16, variation: -0.6 },
        },
      },
    },
  },
};
