// Auth helper functions

module.exports = {
  validateEmailString: function (email) {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if the email matches the regex
    return emailRegex.test(email);
  },
  validateEmailCollege: async function (email, supabaseClient) {
    // Extract the domain from the email string
    const domain = email.split("@")[1];

    // Query the college_email table for the domain
    const { data, error } = await supabaseClient
      .from("college_email")
      .select("domain")
      .eq("domain", domain);

    if (error) {
      throw new Error(error.message);
    }

    // If data is not empty, the domain exists
    return data.length > 0;
  },
  validateEmailAttempts: async function (email, supabaseClient) {
    // Query the otp_emails table for the email
    const { data, error } = await supabaseClient
      .from("otp_emails")
      .select("attempts")
      .eq("email", email);

    if (error) {
      throw new Error(error.message);
    }

    return data[0].attempts < 2;
  },
  incrementEmailAttempts: async function (email, supabaseClient) {
    // Query the otp_emails table for the email
    const { data, error } = await supabaseClient
      .from("otp_emails")
      .select("attempts")
      .eq("email", email);

    if (error) {
      throw new Error(error.message);
    }

    if (data.length === 0) {
      // Insert into otp_emails
      const { error } = await supabaseClient
        .from("otp_emails")
        .insert({ email: email });
      if (error) {
        throw new Error(error.message);
      }
    } else {
      const { error } = await supabaseClient
        .from("otp_emails")
        .update({
          attempts: data[0].attempts + 1,
        })
        .eq("email", email);

      if (error) {
        throw new Error(error.message);
      }
    }
  },
  decrementEmailAttempts: async function (email, supabaseClient) {
    // Query the otp_emails table for the email
    const { data, error } = await supabaseClient
      .from("otp_emails")
      .select("attempts")
      .eq("email", email);

    if (error) {
      throw new Error(error.message);
    }

    if (data.length > 0) {
      const { error } = await supabaseClient
        .from("otp_emails")
        .update({
          attempts: data[0].attempts - 1,
        })
        .eq("email", email);

      if (error) {
        throw new Error(error.message);
      }
    }
  },
  sendOtp: async function (email, supabaseClient) {
    return await supabaseClient.auth.signInWithOtp({
      email: email,
      options: {
        // set this to false if you do not want the user to be automatically signed up
        shouldCreateUser: true,
      },
    });
  },
  verifyOtp: async function (email, otp, supabaseClient) {
    return await supabaseClient.auth.verifyOtp({
      email,
      token: otp,
      type: "email",
    });
  },
  createUser: async function (
    username,
    password,
    degree,
    subtopics,
    supabaseClient
  ) {
    return await supabaseClient.auth.signUp({
      email: username + "@meshuser.xyz",
      password,
      options: {
        data: {
          degree: degree,
          subtopics: subtopics,
        },
      },
    });
  },
  deleteUser: async function (uuid, supabaseClient) {
    return await supabaseClient.auth.admin.deleteUser(uuid);
  },
  loginUser: async function (username, password, supabaseClient) {
    const email = username + "@meshuser.xyz";
    return await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });
  },
  resendOtp: async function (email, supabaseClient) {
    return await supabaseClient.auth.signInWithOtp({
      email: email,
      options: {
        shouldCreateUser: true,
      },
    });
  },
};
