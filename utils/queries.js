import { contract } from "./index";

// Function to parse error messages
function parseErrorMsg(e) {
  const json = JSON.parse(JSON.stringify(e));
  return json?.reason || json?.error?.message || e?.message;
}

export async function getUsernameByAddress(userAddress, provider) {
  try {
    const contractObj = await contract(provider);
    const username = await contractObj.getUsernameByAddress(userAddress);
    return username;
  } catch (e) {
    console.error("Error in getUsernameByAddress:", e);
    throw new Error(parseErrorMsg(e) || "Failed to fetch username.");
  }
}

// Function to create a new user
export async function createUser(
  username,
  basicInfo,
  professionalInfo,
  socialLinks,
  visibility,
  provider
) {
  try {
    const contractObj = await contract(provider);
    const transactionResponse = await contractObj.createUser(
      username,
      basicInfo,
      professionalInfo,
      socialLinks,
      visibility
    );
    const receipt = await transactionResponse.wait();
    return receipt;
  } catch (e) {
    console.error("Error in createUser:", e);
    throw new Error(parseErrorMsg(e) || "Failed to create user.");
  }
}

// Function to edit user information
export async function editUser(
  username,
  basicInfo,
  professionalInfo,
  socialLinks,
  visibility,
  provider
) {
  try {
    const contractObj = await contract(provider);
    const transactionResponse = await contractObj.editUser(
      username,
      basicInfo,
      professionalInfo,
      socialLinks,
      visibility
    );
    const receipt = await transactionResponse.wait();
    return receipt;
  } catch (e) {
    console.error("Error in editUser:", e);
    throw new Error(parseErrorMsg(e) || "Failed to edit user.");
  }
}

// Function to get user information by username
export async function getUserByUsername(username, provider) {
  try {
    const contractObj = await contract(provider);
    const user = await contractObj.getUserByUsername(username);
    return {
      basicInfo: {
        firstName: user.basicInfo.firstName,
        lastName: user.basicInfo.lastName,
        email: user.basicInfo.email,
        homeAddress: user.basicInfo.homeAddress,
        dateOfBirth: user.basicInfo.dateOfBirth,
        phoneNumber: user.basicInfo.phoneNumber,
      },
      professionalInfo: {
        education: user.professionalInfo.education,
        workHistory: user.professionalInfo.workHistory,
        jobTitle: user.professionalInfo.jobTitle,
        info: user.professionalInfo.info,
        skills: user.professionalInfo.skills,
        imageURL: user.professionalInfo.imageURL,
      },
      socialLinks: {
        x: user.socialLinks.x,
        instagram: user.socialLinks.instagram,
        tiktok: user.socialLinks.tiktok,
        youtube: user.socialLinks.youtube,
        linkedin: user.socialLinks.linkedin,
      },
      visibility: {
        education: user.visibility.education,
        workHistory: user.visibility.workHistory,
        phoneNumber: user.visibility.phoneNumber,
        homeAddress: user.visibility.homeAddress,
        dateOfBirth: user.visibility.dateOfBirth,
      },
    };
  } catch (e) {
    console.error("Error in getUserByUsername:", e);
    throw new Error(parseErrorMsg(e) || "Failed to fetch user by username.");
  }
}

// Function to get user information by address
export async function getUserByAddress(userAddress, provider) {
  try {
    const contractObj = await contract(provider);
    const user = await contractObj.getUserByAddress(userAddress);
    return {
      basicInfo: {
        firstName: user.basicInfo.firstName,
        lastName: user.basicInfo.lastName,
        email: user.basicInfo.email,
        homeAddress: user.basicInfo.homeAddress,
        dateOfBirth: user.basicInfo.dateOfBirth,
        phoneNumber: user.basicInfo.phoneNumber,
      },
      professionalInfo: {
        education: user.professionalInfo.education,
        workHistory: user.professionalInfo.workHistory,
        jobTitle: user.professionalInfo.jobTitle,
        info: user.professionalInfo.info,
        skills: user.professionalInfo.skills,
        imageURL: user.professionalInfo.imageURL,
      },
      socialLinks: {
        x: user.socialLinks.x,
        instagram: user.socialLinks.instagram,
        tiktok: user.socialLinks.tiktok,
        youtube: user.socialLinks.youtube,
        linkedin: user.socialLinks.linkedin,
      },
      visibility: {
        education: user.visibility.education,
        workHistory: user.visibility.workHistory,
        phoneNumber: user.visibility.phoneNumber,
        homeAddress: user.visibility.homeAddress,
        dateOfBirth: user.visibility.dateOfBirth,
      },
    };
  } catch (e) {
    console.error("Error in getUserByAddress:", e);
    throw new Error(parseErrorMsg(e) || "Failed to fetch user by address.");
  }
}

// Function to add a job ID that a user has applied to
export async function addJob(username, jobId, provider) {
  try {
    const contractObj = await contract(provider);
    const transactionResponse = await contractObj.addJob(username, jobId);
    const receipt = await transactionResponse.wait();
    return receipt;
  } catch (e) {
    console.error("Error in addJob:", e);
    throw new Error(parseErrorMsg(e) || "Failed to add job.");
  }
}

// Function to get all job IDs applied by a user
export async function getJobs(username, provider) {
  try {
    const contractObj = await contract(provider);
    const jobIds = await contractObj.getJobs(username);
    return jobIds.map((jobId) => jobId.toString());
  } catch (e) {
    console.error("Error in getJobs:", e);
    throw new Error(parseErrorMsg(e) || "Failed to fetch jobs.");
  }
}

// Function to set the visibility of user information
export async function setVisibility(
  username,
  education,
  workHistory,
  phoneNumber,
  homeAddress,
  dateOfBirth,
  provider
) {
  try {
    const contractObj = await contract(provider);
    const transactionResponse = await contractObj.setVisibility(
      username,
      education,
      workHistory,
      phoneNumber,
      homeAddress,
      dateOfBirth
    );
    const receipt = await transactionResponse.wait();
    return receipt;
  } catch (e) {
    console.error("Error in setVisibility:", e);
    throw new Error(parseErrorMsg(e) || "Failed to set visibility.");
  }
}

// Function to get the visibility of user information
export async function getVisibility(username, provider) {
  try {
    const contractObj = await contract(provider);
    const visibility = await contractObj.getVisibility(username);
    return {
      education: visibility.education,
      workHistory: visibility.workHistory,
      phoneNumber: visibility.phoneNumber,
      homeAddress: visibility.homeAddress,
      dateOfBirth: visibility.dateOfBirth,
    };
  } catch (e) {
    console.error("Error in getVisibility:", e);
    throw new Error(parseErrorMsg(e) || "Failed to fetch visibility.");
  }
}
