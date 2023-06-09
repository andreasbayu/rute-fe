const key = [
  'BARANGMAHAL4',
  'BARANGMAHAL2',
  'BARANGMAHAL1',
  'BARANGMAHAL3',
  'Barang6',
];
const barang = [
  {
    id: '63b6d42d0379c5b7633a014c',
    kode: 'BARANGMAHAL1',
    namaPenerima: 'Bayu',
    alamat: 'Desa batang kec tulis kab batang',
    koordinat: {
      longitude: '110.39913671027234',
      latitude: '-7.78796959343299',
    },
    selesai: false,
    diterimaOleh: '',
    pengirimanId: '63b6dc2f81490e71921b2ce6',
    createdAt: '2023-01-05T12:42:10.051Z',
    updatedAt: '2023-01-05T15:06:20.642Z',
  },
  {
    id: '63b6d4400379c5b7633a014d',
    kode: 'BARANGMAHAL2',
    namaPenerima: 'Prasetyo',
    alamat: 'Jalan Dederuk, YO, Indonesia',
    koordinat: {
      longitude: '110.39225793413412',
      latitude: '-7.7805998780020325',
    },
    selesai: false,
    diterimaOleh: '',
    pengirimanId: '63b6dc2f81490e71921b2ce6',
    createdAt: '2023-01-05T12:45:39.894Z',
    updatedAt: '2023-01-05T15:06:49.185Z',
  },
  {
    id: '63b6d4680379c5b7633a014e',
    kode: 'BARANGMAHAL3',
    namaPenerima: 'Ana',
    alamat:
      'Bank Mandiri KCP Yogyakarta Adisucipto, Special Region of Yogyakarta, YO, Indonesia',
    koordinat: {
      longitude: '110.390281',
      latitude: '-7.782881',
    },
    selesai: false,
    diterimaOleh: '',
    pengirimanId: '63b6dc2f81490e71921b2ce6',
    createdAt: '2023-01-05T12:48:59.867Z',
    updatedAt: '2023-01-05T15:07:23.905Z',
  },
  {
    id: '63b70095bade1e223f50eac9',
    kode: 'BARANGMAHAL4',
    namaPenerima: 'Kocak',
    alamat: 'Tes',
    koordinat: {
      longitude: '110.396159',
      latitude: '-7.783133',
    },
    selesai: false,
    diterimaOleh: '',
    pengirimanId: '63b6dc2f81490e71921b2ce6',
    createdAt: '2023-01-05T16:53:41.918Z',
    updatedAt: '2023-01-05T16:53:41.918Z',
  },
];

const sortedBarang = barang.sort(
  (a, b) => key.indexOf(a.kode) - key.indexOf(b.kode),
);
console.log(sortedBarang)