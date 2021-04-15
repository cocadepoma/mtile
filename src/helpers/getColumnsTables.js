export const getColumnsTableWarehouse =
    [
        {
            Header: 'Código',
            accessor: 'code', // accessor is the "key" in the data
        },
        {
            Header: 'Descripción',
            accessor: 'description',
        },
        {
            Header: 'Cantidad',
            accessor: 'quantity',
        },
        {
            Header: 'Stock Mínimo',
            accessor: 'minStock',
        },
        {
            Header: 'Ubicación',
            accessor: 'place',
        },
    ];

export const getColumnsTableHistorical =
    [
        {
            Header: 'Fecha Inicio',
            accessor: 'start', // accessor is the "key" in the data
        },
        {
            Header: 'Tipo Orden',
            accessor: 'orderType',
        },
        {
            Header: 'Avería',
            accessor: 'breakdown',
        },
        {
            Header: 'Factoría',
            accessor: 'factory',
        },
        {
            Header: 'Sección',
            accessor: 'section',
        },
        {
            Header: 'Número',
            accessor: 'number',
        },
        {
            Header: 'Máquina',
            accessor: 'machine',
        },
        {
            Header: 'Tiempo Trabajo',
            accessor: 'totalMins',
        },
        {
            Header: 'Estado',
            accessor: 'closed',
        },
    ];
