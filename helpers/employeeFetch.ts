import { FormProp, Service } from "../interfaces";

// export const loginFetchApi = async (endpoint: string, dataUser: FormProp) => {
//     const response = await fetch(`http://localhost:5050/api/${endpoint}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(dataUser),
//     });
//     const data = await response.json();
//     return data;
//   };

export const createNewServicefetch = async (body: Service) => {
    const res = await fetch(`http://localhost:5050/api/services`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    })
    const data = await res.json();
    console.log(data);
    return data;
}