export interface State {
    id:      number;
    sigla:   string;
    nome:    string;
    regiao: Region;
}

export interface Region {
    id:    number;
    sigla: string;
    nome:  string;
}

export interface District {
  id:        number;
  nome:      string;
  municipio: Municipio;
}

export interface Municipio {
  id:                number;
  nome:              string;
  microrregiao:      Microrregiao;
  regiaoImediata: RegiaoImediata;
}

export interface Microrregiao {
  id:          number;
  nome:        string;
  mesorregiao: Mesorregiao;
}

export interface Mesorregiao {
  id:   number;
  nome: string;
  UF:   Uf;
}

export interface Uf {
  id:      number;
  sigla:   string;
  nome:    string;
  regiao?: Uf;
}

export interface RegiaoImediata {
  id:                     number;
  nome:                   string;
  regiaoIntermediaria: Mesorregiao;
}
