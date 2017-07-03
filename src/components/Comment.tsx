import * as React from "react"

interface CommentProps {
    comments: string[]
    style: any
}

export const Comment = ({ comments, style = {} }: CommentProps) => (
    <div className="comment" style={style}>
        <div className="comment-body" style={commentBodyStyle}>
            {comments.map((line, i) => (<p key={i} style={commentStyle}>{line}</p>))}
        </div>
    </div>
)

export default Comment

const commentBodyStyle = {
    height: "100%",
    overflow: "scroll"
}

const commentStyle = {
    margin: 0
}
