import React, { Fragment } from 'react'
import {Link} from 'react-router-dom'
import './Users.css'

function User() {
    return (
        <Fragment>
            <main>
                <div className = "main__container">
                    {/* verified */}
                    <table>
                        <tr>
                            <th>Id</th>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Email</th>
                            <th>Mobile Phone Number</th>
                            <th>City</th>
                            <th>Date Joined</th>
                            <th>Action</th>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Ekomobong</td>
                            <td>Archibong</td>
                            <td>ekomboy012@gmail.com</td>
                            <td>09015871166</td>
                            <td>Kaura</td>
                            <td>11/10/2001</td>
                            <td> <Link to = {`/user/1`} className = "btn">See more</Link> </td>
                        </tr>
                    </table>
                </div>
            </main>
        </Fragment>
    )
}

export default User;