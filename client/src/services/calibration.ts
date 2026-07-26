import api from "../lib/api";

export const uploadResume = async (
  file: File,
  token: string,
) => {
  const formData = new FormData();
  formData.append("resume", file);

  const { data } = await api.post(
    "/resume/upload",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return data;
};

export const analyzeJobDescription = async (
  jobDescription: string,
  token: string,
) => {
  const { data } = await api.post(
    "/job-description/analyze",
    {
      jobDescription,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const retrieveContext = async (
  jobDescription: string,
  token: string,
) => {
  const { data } = await api.post(
    "/resume/retrieve",
    {
      jobDescription,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const calibrateResume = async (
  token: string,
) => {
  const { data } = await api.post(
    "/calibrator",
    null,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const rewriteBullet = async (
  bulletId: string,
  structuredJobDescription: unknown,
  token: string,
) => {
  const { data } = await api.post(
    "/rewrite",
    {
      bulletId,
      structuredJobDescription,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};