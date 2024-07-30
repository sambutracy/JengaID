const { expect } = require("chai");
const hre = require("hardhat");

describe("jengaID", function () {
  let jengaID;
  let owner, user1, user2;

  beforeEach(async function () {
    [owner, user1, user2] = await hre.ethers.getSigners();
    const jengaID = await hre.ethers.getContractFactory("jengaID");
  "jengaID = await"jengaID.deploy();
    await"jengaID.deployed();
  });

  it("Should create a new user", async function () {
    const basicInfo = {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      homeAddress: "123 Main St",
      dateOfBirth: "1990-01-01",
      phoneNumber: "1234567890",
    };

    const professionalInfo = {
      education: "Harvard",
      workHistory: "Google, Microsoft",
      jobTitle: "Software Engineer",
      info: "Experienced developer",
      skills: ["Solidity", "JavaScript"],
      imageURL: "http://example.com/image.jpg",
    };

    const socialLinks = {
      x: "http://twitter.com/johndoe",
      instagram: "http://instagram.com/johndoe",
      tiktok: "http://tiktok.com/@johndoe",
      youtube: "http://youtube.com/johndoe",
      linkedin: "http://linkedin.com/in/johndoe",
    };

    const visibility = {
      education: true,
      workHistory: true,
      phoneNumber: true,
      homeAddress: true,
      dateOfBirth: true,
    };

    await"jengaID.createUser(
      "johndoe",
      basicInfo,
      professionalInfo,
      socialLinks,
      visibility
    );

    const user = await"jengaID.getUserByUsername("johndoe");
    expect(user.basicInfo.firstName).to.equal("John");
    expect(user.basicInfo.lastName).to.equal("Doe");
    expect(user.basicInfo.email).to.equal("john@example.com");
  });

  it("Should edit an existing user", async function () {
    const basicInfo = {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      homeAddress: "123 Main St",
      dateOfBirth: "1990-01-01",
      phoneNumber: "1234567890",
    };

    const professionalInfo = {
      education: "Harvard",
      workHistory: "Google, Microsoft",
      jobTitle: "Software Engineer",
      info: "Experienced developer",
      skills: ["Solidity", "JavaScript"],
      imageURL: "http://example.com/image.jpg",
    };

    const socialLinks = {
      x: "http://twitter.com/johndoe",
      instagram: "http://instagram.com/johndoe",
      tiktok: "http://tiktok.com/@johndoe",
      youtube: "http://youtube.com/johndoe",
      linkedin: "http://linkedin.com/in/johndoe",
    };

    const visibility = {
      education: true,
      workHistory: true,
      phoneNumber: true,
      homeAddress: true,
      dateOfBirth: true,
    };

    await"jengaID.createUser(
      "johndoe",
      basicInfo,
      professionalInfo,
      socialLinks,
      visibility
    );

    // Edit user
    basicInfo.firstName = "Jane";
    basicInfo.lastName = "Smith";
    professionalInfo.jobTitle = "Product Manager";

    await"jengaID.editUser(
      "johndoe",
      basicInfo,
      professionalInfo,
      socialLinks,
      visibility
    );

    const user = await"jengaID.getUserByUsername("johndoe");
    expect(user.basicInfo.firstName).to.equal("Jane");
    expect(user.basicInfo.lastName).to.equal("Smith");
    expect(user.professionalInfo.jobTitle).to.equal("Product Manager");
  });

  it("Should fetch user data by address", async function () {
    const basicInfo = {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      homeAddress: "123 Main St",
      dateOfBirth: "1990-01-01",
      phoneNumber: "1234567890",
    };

    const professionalInfo = {
      education: "Harvard",
      workHistory: "Google, Microsoft",
      jobTitle: "Software Engineer",
      info: "Experienced developer",
      skills: ["Solidity", "JavaScript"],
      imageURL: "http://example.com/image.jpg",
    };

    const socialLinks = {
      x: "http://twitter.com/johndoe",
      instagram: "http://instagram.com/johndoe",
      tiktok: "http://tiktok.com/@johndoe",
      youtube: "http://youtube.com/johndoe",
      linkedin: "http://linkedin.com/in/johndoe",
    };

    const visibility = {
      education: true,
      workHistory: true,
      phoneNumber: true,
      homeAddress: true,
      dateOfBirth: true,
    };

    await"jengaID
      .connect(user1)
      .createUser(
        "johndoe",
        basicInfo,
        professionalInfo,
        socialLinks,
        visibility
      );

    const user = await"jengaID.connect(user1).getUserByAddress(user1.address);
    expect(user.basicInfo.firstName).to.equal("John");
    expect(user.basicInfo.lastName).to.equal("Doe");
    expect(user.basicInfo.email).to.equal("john@example.com");
  });

  it("Should ensure the username is unique", async function () {
    const basicInfo = {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      homeAddress: "123 Main St",
      dateOfBirth: "1990-01-01",
      phoneNumber: "1234567890",
    };

    const professionalInfo = {
      education: "Harvard",
      workHistory: "Google, Microsoft",
      jobTitle: "Software Engineer",
      info: "Experienced developer",
      skills: ["Solidity", "JavaScript"],
      imageURL: "http://example.com/image.jpg",
    };

    const socialLinks = {
      x: "http://twitter.com/johndoe",
      instagram: "http://instagram.com/johndoe",
      tiktok: "http://tiktok.com/@johndoe",
      youtube: "http://youtube.com/johndoe",
      linkedin: "http://linkedin.com/in/johndoe",
    };

    const visibility = {
      education: true,
      workHistory: true,
      phoneNumber: true,
      homeAddress: true,
      dateOfBirth: true,
    };

    await"jengaID.createUser(
      "johndoe",
      basicInfo,
      professionalInfo,
      socialLinks,
      visibility
    );

    await expect(
    "jengaID
        .connect(user2)
        .createUser(
          "johndoe",
          basicInfo,
          professionalInfo,
          socialLinks,
          visibility
        )
    ).to.be.revertedWith("Username already exists.");
  });

  it("Should set and get visibility settings", async function () {
    const basicInfo = {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      homeAddress: "123 Main St",
      dateOfBirth: "1990-01-01",
      phoneNumber: "1234567890",
    };

    const professionalInfo = {
      education: "Harvard",
      workHistory: "Google, Microsoft",
      jobTitle: "Software Engineer",
      info: "Experienced developer",
      skills: ["Solidity", "JavaScript"],
      imageURL: "http://example.com/image.jpg",
    };

    const socialLinks = {
      x: "http://twitter.com/johndoe",
      instagram: "http://instagram.com/johndoe",
      tiktok: "http://tiktok.com/@johndoe",
      youtube: "http://youtube.com/johndoe",
      linkedin: "http://linkedin.com/in/johndoe",
    };

    const visibility = {
      education: true,
      workHistory: true,
      phoneNumber: true,
      homeAddress: true,
      dateOfBirth: true,
    };

    await"jengaID.createUser(
      "johndoe",
      basicInfo,
      professionalInfo,
      socialLinks,
      visibility
    );

    await"jengaID.setVisibility("johndoe", false, false, false, false, false);

    const updatedVisibility = await"jengaID.getVisibility("johndoe");
    expect(updatedVisibility.education).to.equal(false);
    expect(updatedVisibility.workHistory).to.equal(false);
    expect(updatedVisibility.phoneNumber).to.equal(false);
    expect(updatedVisibility.homeAddress).to.equal(false);
    expect(updatedVisibility.dateOfBirth).to.equal(false);
  });
});