export const validateEmail = (email: string): boolean => {
    return email.includes("@") && email.includes(".");
  };
  
  export const validateCPF = (cpf: string): boolean => {
    cpf = cpf.replace(/\D/g, ""); // Remove não numéricos
    if (cpf.length !== 11) return false;
    return true; // Adicione mais validação se necessário
  };
  
  export const validatePassword = (password: string, confirmPassword: string): boolean => {
    return password === confirmPassword;
  };
  