export const validationMixins = {
    data() {
        return {
            rulesRequired: [v => !!v || "Field Required."],
            rulesUsername: [v => !!v || "Username is required"],
            rulesName: [
                v => !!v || "Name is required",
                v => v.length >= 3 || "Name must be more than 3 characters"
            ],
            rulesEmail: [v => !!v || "E-mail is required",
            value => {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return pattern.test(value) || "E-mail must be valid";
            }
            ],
            rulesPassword: [
                value => !!value || "Password Required.",
                v => v.length >= 8 || "Min 8 characters"
            ]
        };
    },
};
