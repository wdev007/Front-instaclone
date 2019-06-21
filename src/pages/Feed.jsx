import React from 'react';
import './Feed.css';

//import api from '../services/api';

import more from '../assets/more.svg';
import like from '../assets/like.svg';
import comment from '../assets/comment.svg';
import send from '../assets/send.svg';
import api from '../services/api';
import io from 'socket.io-client';

class Feed extends React.Component {

    state = {
        feed: [],
    }

    async componentDidMount() {
        this.registerToSocket();

        const response = await api.get('/posts');

        this.setState({ feed: response.data });
    }

    handleLike = id => {
        api.post(`/posts/${id}/like`);
    }

    registerToSocket = () => {
        const socket = io('http://localhost:3001');

        socket.on('post', newPost => {
            this.setState({ feed: [newPost, ...this.state.feed] });
        })

        socket.on('like', likedPost => {
            this.setState({ feed: this.state.feed.map(post => 
                    post._id === likedPost._id ? likedPost : post
                )});
        })
    }

    render() {
        return (
            <section id="post-list">
                { this.state.feed.map(post => (

                    <article key={post._id}>
                        {/* Cabeçalho do post */}
                        <header>
                            <div className="user-info">
                                <span>{post.author}</span>
                                <span className="place">{post.place}</span>
                            </div>
                            <img src={more} alt="mais"/>
                        </header>

                        {/* Meio do post, onde fica a imagem */}
                        <img src={`http://localhost:3001/files/${post.image}`} alt=""/>

                        {/* Rodapé do post, onde fica as curtidas, comentarios, etc. */}

                        <footer>
                            <div className="actions">
                                {/* Aqui ficam os botoes de ação */}
                                <button type="button" onClick={() => this.handleLike(post._id)}>
                                    <img src={like} alt="like"/>
                                </button>
                                <img src={comment} alt="comentário"/>
                                <img src={send} alt=""/>
                            </div>
                            <strong>{post.likes} curtidas</strong>
                            <p>
                                {post.descripition}
                                <span>{post.hashtags}</span>
                            </p>
                        </footer>
                </article>

                )) }
            </section>
        );
    }
}

export default Feed;