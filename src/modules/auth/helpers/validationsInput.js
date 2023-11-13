const isSamePsw = (val, valSame) => {
    return (
      val === valSame || "las Contraseñas no son iguales"
    );
  };
  const pswShort = (val) => {
    if (val.length < 6) return "Contraseña muy corta, debe tener al menos 6";
  };

  const isValidEmail = (val) => {
    const emailPattern =
      /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
    return emailPattern.test(val) || "El correo no parece ser válido";
  };

  export {
    isSamePsw,
    pswShort,
    isValidEmail,
  }