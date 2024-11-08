export const validateZodInput = (
  payload: any,
  schema: any,
  isArrayErrorResult = false
) => {
  try {
    const parseResult = schema.parse(payload);
    return { isError: false, data: parseResult, message: "success" };
  } catch (error: any) {
    const errors: any = {};
    let issues = error.issues;
    const message = issues?.map((issue: any) => issue.message)?.join("\r\n");
    if (isArrayErrorResult) {
      issues = issues.map((issue: any) => issue.message);
      return { isError: true, message, data: issues };
    }
    for (const issue of issues) {
      errors[issue?.path[0]] = issue.message;
    }
    return { isError: true, message, data: errors };
  }
};
