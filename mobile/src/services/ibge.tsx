import axios from 'axios';

const igbe = axios.create({
  baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
});

interface IBGE_UF_RESPONSE {
  sigla: string,
  nome: string
}

interface IBGE_CITY_RESPONSE {
  nome: string
}

export function GetUFs(cb:(ufs: IBGE_UF_RESPONSE[])=>void) {
  igbe.get<IBGE_UF_RESPONSE[]>('/')
    .then(response => {
      cb(response.data);
    }
  );
}

export function GetCitys(uf:string|number, cb:(ufs: string[])=>void) {
  igbe.get<IBGE_CITY_RESPONSE[]>(`${uf}/municipios`)
    .then(response => {
      cb(response.data.map(item => item.nome));
    }
  );
}

export default igbe;
