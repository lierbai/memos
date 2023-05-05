import axios from "axios";

type ResponseObject<T> = {
  data: T;
  error?: string;
  message?: string;
};

export function getSystemStatus() {
  return axios.get<ResponseObject<SystemStatus>>("/memos/api/status");
}

export function getSystemSetting() {
  return axios.get<ResponseObject<SystemSetting[]>>("/memos/api/system/setting");
}

export function upsertSystemSetting(systemSetting: SystemSetting) {
  return axios.post<ResponseObject<SystemSetting>>("/memos/api/system/setting", systemSetting);
}

export function vacuumDatabase() {
  return axios.post("/memos/api/system/vacuum");
}

export function signin(username: string, password: string) {
  return axios.post<ResponseObject<User>>("/memos/api/auth/signin", {
    username,
    password,
  });
}

export function signinWithSSO(identityProviderId: IdentityProviderId, code: string, redirectUri: string) {
  return axios.post<ResponseObject<User>>("/memos/api/auth/signin/sso", {
    identityProviderId,
    code,
    redirectUri,
  });
}

export function signup(username: string, password: string) {
  return axios.post<ResponseObject<User>>("/memos/api/auth/signup", {
    username,
    password,
  });
}

export function signout() {
  return axios.post("/memos/api/auth/signout");
}

export function createUser(userCreate: UserCreate) {
  return axios.post<ResponseObject<User>>("/memos/api/user", userCreate);
}

export function getMyselfUser() {
  return axios.get<ResponseObject<User>>("/memos/api/user/me");
}

export function getUserList() {
  return axios.get<ResponseObject<User[]>>("/memos/api/user");
}

export function getUserById(id: number) {
  return axios.get<ResponseObject<User>>(`/memos/api/user/${id}`);
}

export function upsertUserSetting(upsert: UserSettingUpsert) {
  return axios.post<ResponseObject<UserSetting>>(`/memos/api/user/setting`, upsert);
}

export function patchUser(userPatch: UserPatch) {
  return axios.patch<ResponseObject<User>>(`/memos/api/user/${userPatch.id}`, userPatch);
}

export function deleteUser(userDelete: UserDelete) {
  return axios.delete(`/memos/api/user/${userDelete.id}`);
}

export function getAllMemos(memoFind?: MemoFind) {
  const queryList = [];
  if (memoFind?.offset) {
    queryList.push(`offset=${memoFind.offset}`);
  }
  if (memoFind?.limit) {
    queryList.push(`limit=${memoFind.limit}`);
  }

  return axios.get<ResponseObject<Memo[]>>(`/memos/api/memo/all?${queryList.join("&")}`);
}

export function getMemoList(memoFind?: MemoFind) {
  const queryList = [];
  if (memoFind?.creatorId) {
    queryList.push(`creatorId=${memoFind.creatorId}`);
  }
  if (memoFind?.rowStatus) {
    queryList.push(`rowStatus=${memoFind.rowStatus}`);
  }
  if (memoFind?.pinned) {
    queryList.push(`pinned=${memoFind.pinned}`);
  }
  if (memoFind?.offset) {
    queryList.push(`offset=${memoFind.offset}`);
  }
  if (memoFind?.limit) {
    queryList.push(`limit=${memoFind.limit}`);
  }
  return axios.get<ResponseObject<Memo[]>>(`/memos/api/memo?${queryList.join("&")}`);
}

export function getMemoStats(userId: UserId) {
  return axios.get<ResponseObject<number[]>>(`/memos/api/memo/stats?creatorId=${userId}`);
}

export function getMemoById(id: MemoId) {
  return axios.get<ResponseObject<Memo>>(`/memos/api/memo/${id}`);
}

export function createMemo(memoCreate: MemoCreate) {
  return axios.post<ResponseObject<Memo>>("/memos/api/memo", memoCreate);
}

export function patchMemo(memoPatch: MemoPatch) {
  return axios.patch<ResponseObject<Memo>>(`/memos/api/memo/${memoPatch.id}`, memoPatch);
}

export function pinMemo(memoId: MemoId) {
  return axios.post(`/memos/api/memo/${memoId}/organizer`, {
    pinned: true,
  });
}

export function unpinMemo(memoId: MemoId) {
  return axios.post(`/memos/api/memo/${memoId}/organizer`, {
    pinned: false,
  });
}

export function deleteMemo(memoId: MemoId) {
  return axios.delete(`/memos/api/memo/${memoId}`);
}

export function getShortcutList(shortcutFind?: ShortcutFind) {
  const queryList = [];
  if (shortcutFind?.creatorId) {
    queryList.push(`creatorId=${shortcutFind.creatorId}`);
  }
  return axios.get<ResponseObject<Shortcut[]>>(`/memos/api/shortcut?${queryList.join("&")}`);
}

export function createShortcut(shortcutCreate: ShortcutCreate) {
  return axios.post<ResponseObject<Shortcut>>("/memos/api/shortcut", shortcutCreate);
}

export function patchShortcut(shortcutPatch: ShortcutPatch) {
  return axios.patch<ResponseObject<Shortcut>>(`/memos/api/shortcut/${shortcutPatch.id}`, shortcutPatch);
}

export function deleteShortcutById(shortcutId: ShortcutId) {
  return axios.delete(`/memos/api/shortcut/${shortcutId}`);
}

export function getResourceList() {
  return axios.get<ResponseObject<Resource[]>>("/memos/api/resource");
}

export function getResourceListWithLimit(resourceFind?: ResourceFind) {
  const queryList = [];
  if (resourceFind?.offset) {
    queryList.push(`offset=${resourceFind.offset}`);
  }
  if (resourceFind?.limit) {
    queryList.push(`limit=${resourceFind.limit}`);
  }
  return axios.get<ResponseObject<Resource[]>>(`/memos/api/resource?${queryList.join("&")}`);
}

export function createResource(resourceCreate: ResourceCreate) {
  return axios.post<ResponseObject<Resource>>("/memos/api/resource", resourceCreate);
}

export function createResourceWithBlob(formData: FormData) {
  return axios.post<ResponseObject<Resource>>("/memos/api/resource/blob", formData);
}

export function deleteResourceById(id: ResourceId) {
  return axios.delete(`/memos/api/resource/${id}`);
}

export function patchResource(resourcePatch: ResourcePatch) {
  return axios.patch<ResponseObject<Resource>>(`/memos/api/resource/${resourcePatch.id}`, resourcePatch);
}

export function getMemoResourceList(memoId: MemoId) {
  return axios.get<ResponseObject<Resource[]>>(`/memos/api/memo/${memoId}/resource`);
}

export function upsertMemoResource(memoId: MemoId, resourceId: ResourceId) {
  return axios.post<ResponseObject<Resource>>(`/memos/api/memo/${memoId}/resource`, {
    resourceId,
  });
}

export function deleteMemoResource(memoId: MemoId, resourceId: ResourceId) {
  return axios.delete(`/memos/api/memo/${memoId}/resource/${resourceId}`);
}

export function getTagList(tagFind?: TagFind) {
  const queryList = [];
  if (tagFind?.creatorId) {
    queryList.push(`creatorId=${tagFind.creatorId}`);
  }
  return axios.get<ResponseObject<string[]>>(`/memos/api/tag?${queryList.join("&")}`);
}

export function getTagSuggestionList() {
  return axios.get<ResponseObject<string[]>>(`/memos/api/tag/suggestion`);
}

export function upsertTag(tagName: string) {
  return axios.post<ResponseObject<string>>(`/memos/api/tag`, {
    name: tagName,
  });
}

export function deleteTag(tagName: string) {
  return axios.post<ResponseObject<boolean>>(`/memos/api/tag/delete`, {
    name: tagName,
  });
}

export function getStorageList() {
  return axios.get<ResponseObject<ObjectStorage[]>>(`/memos/api/storage`);
}

export function createStorage(storageCreate: StorageCreate) {
  return axios.post<ResponseObject<ObjectStorage>>(`/memos/api/storage`, storageCreate);
}

export function patchStorage(storagePatch: StoragePatch) {
  return axios.patch<ResponseObject<ObjectStorage>>(`/memos/api/storage/${storagePatch.id}`, storagePatch);
}

export function deleteStorage(storageId: StorageId) {
  return axios.delete(`/memos/api/storage/${storageId}`);
}

export function getIdentityProviderList() {
  return axios.get<ResponseObject<IdentityProvider[]>>(`/memos/api/idp`);
}

export function createIdentityProvider(identityProviderCreate: IdentityProviderCreate) {
  return axios.post<ResponseObject<IdentityProvider>>(`/memos/api/idp`, identityProviderCreate);
}

export function patchIdentityProvider(identityProviderPatch: IdentityProviderPatch) {
  return axios.patch<ResponseObject<IdentityProvider>>(`/memos/api/idp/${identityProviderPatch.id}`, identityProviderPatch);
}

export function deleteIdentityProvider(id: IdentityProviderId) {
  return axios.delete(`/memos/api/idp/${id}`);
}

export function postChatCompletion(messages: any[]) {
  return axios.post<ResponseObject<string>>(`/memos/api/openai/chat-completion`, messages);
}

export function checkOpenAIEnabled() {
  return axios.get<ResponseObject<boolean>>(`/memos/api/openai/enabled`);
}

export async function getRepoStarCount() {
  const { data } = await axios.get(`https://api.github.com/repos/usememos/memos`, {
    headers: {
      Accept: "application/vnd.github.v3.star+json",
      Authorization: "",
    },
  });
  return data.stargazers_count as number;
}

export async function getRepoLatestTag() {
  const { data } = await axios.get(`https://api.github.com/repos/usememos/memos/tags`, {
    headers: {
      Accept: "application/vnd.github.v3.star+json",
      Authorization: "",
    },
  });
  return data[0].name as string;
}
