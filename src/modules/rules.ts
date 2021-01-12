const nameRules = [
    (v: string) => !!v || "Name is required",
    (v: string) =>
      (v && v.length <= 50) || "Name must be less than 50 characters",
  ];

const webRules = [
    (v: string) => !!v || "Website is required",
    (v: string) =>
      /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/.test(
        v
      ) || "Website must be valid",
  ];

const required = [
    (v:string) => !!v || "Item is required"
]

  export default {
      nameRules,
      webRules,
      required
  }