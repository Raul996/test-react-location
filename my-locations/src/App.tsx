import React from 'react';
import './App.css';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import { Switch } from 'react-router';
import CategoryComponent from './UI/categoryComponent/CategoryComponent';
import LocationComponent from './UI/locationComponent/LocationComponent';

function App() {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/category" />
                    </Route>
                    <Route exact path="/category">
                        <CategoryComponent />
                    </Route>
                    <Route exact path="/location">
                        <LocationComponent />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
