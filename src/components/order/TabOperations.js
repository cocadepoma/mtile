import React from 'react'


const handleAddOperation = () => {

}

export const TabOperations = ({ operations, setFormValues }) => {
    return (
        <div className="tab-table-wrapper">
            <div className="button-add-tab-wrapper" onClick={handleAddOperation}>
                <i className="fas fa-plus-circle"></i><span>Nueva operación</span>
            </div>

            <div className="header-tab-table">

                <div>
                    <p>Tiempo</p>
                </div>
                <div>
                    <p>Operaciones</p>
                </div>
            </div>

            {
                operations.length > 0
                &&
                operations.map((operation, i) =>
                (
                    <div className="header-tab-body" key={i}>
                        <div>
                            <p>{operation.time}</p>
                        </div>
                        <div>
                            <p>{operation.operation}</p>
                        </div>
                        <div>
                            <i className="far fa-trash-alt"></i>
                            <i className="far fa-edit"></i>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
