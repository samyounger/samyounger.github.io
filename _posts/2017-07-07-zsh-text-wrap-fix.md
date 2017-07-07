---
title: Zsh Text Wrap Fix
date: 2017-07-07
categories: [ bash, terminal, zsh ]
published: true
---

    DESCRIPTION: When using the terminal occasionally the text when reaching the end of the line instead of moving to a new line, it would overwrite the same line, and go very strange when deleting the text. I use ZSH and Oh-My-Zsh.

I found this [POST](https://github.com/robbyrussell/oh-my-zsh/issues/2314) described the issue I was having with my terminal.

Also a StackOverflow post about this [POST](https://apple.stackexchange.com/questions/37001/strange-behavior-in-terminal-with-custom-bash-profile/37036#37036). Look at the video for the strange behaviour. Not the post answers.

---

This was the fix, which was related to the robbyrussell theme.

Find the robby russell theme directory: `/Users/samyounger/.oh-my-zsh/themes`

Update line 2 from this:

```
$ PROMPT='${ret_status} %{$fg[cyan]%}%c%{$reset_color%} $(git_prompt_info)'
```

To this:

```
$ PROMPT='%{${ret_status}%} %{$fg[cyan]%}%c%{$reset_color%} $(git_prompt_info)'
```

---

**NOTE:** I ended up not using this, as it is probably an error with oh-my-zsh. I updated the version of oh-my-zsh by running in the terminal `upgrade_oh_my_zsh` to the latest version. Hopefully this will fix it. I prefer not to mess with code from a git-tracked directory.
