import Request from "@/services/request";

// test
export function xhrPostTest(data) {
  return Request({
    url: `/test`,
    method: "post",
    data,
  });
}
export function xhrGetTest(params) {
  return Request({
    url: `/test`,
    method: "get",
    params
  });
}
