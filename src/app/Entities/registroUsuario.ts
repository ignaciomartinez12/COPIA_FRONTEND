export class registroUsuario {
  usuarioCorreo: string; 
  pwd: string; 
  nif: string; 
  numeroTlf: number; 
  direccionCompleta: string;

  constructor(usuarioCorreo: string, pwd: string, nif: string, numeroTlf: number, direccionCompleta: string ) {
    this.usuarioCorreo = usuarioCorreo; 
    this.pwd = pwd; 
    this.nif = nif; 
    this.numeroTlf = numeroTlf; 
    this.direccionCompleta = direccionCompleta;
  }
}
