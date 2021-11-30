ARG BASE
FROM ${BASE}

ARG USERNAME=user
ARG GROUPNAME=user
ARG UID=1000
ARG GID=1000
RUN usermod -u 1001 node &&\
    groupmod -g 1001 node &&\
    groupadd -g ${GID} ${GROUPNAME} && \
    useradd -m -s /bin/bash -u ${UID} -g ${GID} ${USERNAME}
USER $USERNAME

RUN mkdir /home/${USERNAME}/.local && \
    mkdir /home/${USERNAME}/.local/lib && \
    mkdir /home/${USERNAME}/project

WORKDIR /home/${USERNAME}/project