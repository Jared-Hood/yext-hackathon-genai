export interface YextError {
  code: number;
  type: "FATAL_ERROR" | "NON_FATAL_ERROR" | "WARNING";
  message: string;
}

export interface YextAPIResponse {
  meta: {
    uuid: string;
    errors: YextError[]
  };
  response: any;
}
